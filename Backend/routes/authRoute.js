const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const redis = require("redis");
const { User, Address } = require("../models");
const { getOrderDetails, getAddress, formatUserResponse } = require("./user");

const refreshTokenExpiry = 7 * 24 * 60 * 60; // 7 days in seconds
const SALT_ROUND = process.env.SALT_ROUND || 10;
const JWT_ACCESS_SECRET =
  process.env.JWT_ACCESS_SECRET || "your-access-secret-key";
const JWT_REFRESH_SECRET =
  process.env.JWT_REFRESH_SECRET || "your-refresh-secret-key";
const ACCESS_TOKEN_EXPIRY = "30m"; // 30 minutes
const REFRESH_TOKEN_EXPIRY = "7d"; // 7 days

// Redis client setup
const redisClient = redis.createClient({
  host: process.env.REDIS_HOST || "localhost",
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASSWORD || undefined,
  url: process.env.REDIS_URL || undefined,
});

redisClient.on("error", (err) => {
  console.error("Redis Client Error:", err);
});

redisClient.on("connect", () => {
  console.log("Connected to Redis");
});

// Connect to Redis
(async () => {
  try {
    await redisClient.connect();
  } catch (error) {
    console.error("Failed to connect to Redis:", error);
  }
})();

// Helper functions
const generateAccessToken = (userId) => {
  return jwt.sign(
    {
      userId: userId,
    },
    JWT_ACCESS_SECRET,
    { expiresIn: ACCESS_TOKEN_EXPIRY }
  );
};

const generateRefreshToken = async (userId) => {
  const token = jwt.sign({ userId: userId }, JWT_REFRESH_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRY,
  });

  // Store refresh token in Redis with expiration
  const tokenKey = `refresh_token:${token}`;
  const tokenData = {
    userId: userId,
    createdAt: new Date().toISOString(),
  };

  try {
    await redisClient.setEx(
      tokenKey,
      refreshTokenExpiry,
      JSON.stringify(tokenData)
    );
  } catch (error) {
    console.error("Error storing refresh token in Redis:", error);
    throw new Error("Failed to store refresh token");
  }

  return token;
};

// Middleware to verify access token
const validateRefreshToken = async (token) => {
  const tokenKey = `refresh_token:${token}`;
  try {
    const tokenData = await redisClient.get(tokenKey);
    return tokenData ? JSON.parse(tokenData) : null;
  } catch (error) {
    console.error("Error validating refresh token from Redis:", error);
    return null;
  }
};

// Helper function to remove refresh token from Redis
const removeRefreshToken = async (token) => {
  await redisClient.del(`refresh_token:${token}`);
};

// Helper function to remove all refresh tokens for a user
const removeAllUserRefreshTokens = async (userId) => {
  try {
    const pattern = `refresh_token:*`;
    const keys = await redisClient.keys(pattern);

    for (const key of keys) {
      const tokenData = await redisClient.get(key);
      if (tokenData) {
        const parsed = JSON.parse(tokenData);
        if (parsed.userId === userId) {
          await redisClient.del(key);
        }
      }
    }
  } catch (error) {
    console.error("Error removing user refresh tokens from Redis:", error);
  }
};

const getUser = async (userId) => {
  const user = await User.findByPk(userId, {
    attributes: ["id", "firstName", "lastName", "email", "contact"],
  });
  return user ? user.toJSON() : null;
};

router.post("/checkUserCred", async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ error: "Refresh token required" });
    }
    const tokenData = await validateRefreshToken(refreshToken);
    if (!tokenData) {
      clearRefreshToken(res, refreshToken);
      return res.status(403).json({ error: "Invalid refresh token" });
    }
    await removeRefreshToken(refreshToken);
    const [user, address, orders, newRefreshToken] = await Promise.all([
      getUser(tokenData.userId),
      getAddress(tokenData.userId),
      getOrderDetails(tokenData.userId),
      generateRefreshToken(tokenData.userId),
    ]);
    const accessToken = generateAccessToken(tokenData.userId);
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: refreshTokenExpiry,
    });

    return res.status(200).json({
      message: "Valid credentials",
      user: formatUserResponse(user, address),
      orders,
      accessToken,
    });
  } catch (error) {
    console.error("Error checking user credentials:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/updateAddress", async (req, res) => {
  try {
    const { address } = req.body;
    const userAddress = await Address.findByPk(address.id);
    if (!userAddress) {
      return res.status(404).json({ error: "Address not found" });
    }
    userAddress.type = address.type;
    userAddress.isDefault = address.isDefault;
    userAddress.address = address.address;
    userAddress.city = address.city;
    userAddress.state = address.state;
    userAddress.postalCode = address.postalCode;
    await userAddress.save();
    return res.status(200).json({ message: "Address updated successfully" });
  } catch (error) {
    console.error("Error updating address:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/addAddress", async (req, res) => {
  try {
    const { userId, address } = req.body;
    const newAddress = await Address.create({
      userId: userId,
      type: address.type,
      isDefault: address.isDefault,
      address: address.address,
      city: address.city,
      state: address.state,
      postalCode: address.postalCode,
    });
    return res.status(200).json({ message: "Address added successfully" });
  } catch (error) {
    console.error("Error adding address:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/userInfoUpdate", async (req, res) => {
  try {
    const { userId, firstName, lastName, email, contact } = req.body;
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.contact = contact;
    await user.save();
    return res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

const verifyAccessToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ error: "Access token required" });
  }

  jwt.verify(token, JWT_ACCESS_SECRET, (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res
          .status(401)
          .json({ error: "Access token expired", isTokenExpired: true });
      }
      res.clearCookie("refreshToken");
      return res.status(403).json({ error: "Invalid access token" });
    }
    req.user = decoded;
    next();
  });
};

router.post("/addUser", async (req, res) => {
  try {
    if (req.body.sub) {
      let user = await User.findOne({
        where: { sub: req.body.sub },
        attributes: [
          "id",
          "firstName",
          "lastName",
          "email",
          "contact",
          "password",
        ],
      });
      if (!user) {
        user = await User.findOne({
          where: { email: req.body.email },
          attributes: [
            "id",
            "firstName",
            "lastName",
            "email",
            "contact",
            "password",
          ],
        });
        if (user) {
          user.sub = req.body.sub;
          await user.save();
        }
      }
      if (!user) {
        user = await User.create({
          sub: req.body.sub,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          contact: req.body.contact,
        });
      }

      const [address, orders, refreshToken] = await Promise.all([
        getAddress(user.id),
        getOrderDetails(user.id),
        generateRefreshToken(user.id),
      ]);

      const accessToken = generateAccessToken(user.id);

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.status(200).json({
        message: "Successfully logged in with Google",
        user: formatUserResponse(user, address),
        orders,
        accessToken,
      });
    } else {
      if (!req.body.email) {
        return res.status(400).json({ error: "Email is required" });
      }
      const existingEmail = await User.findOne({
        where: { email: req.body.email },
      });

      if (existingEmail) {
        return res.status(409).json({ error: "Email already in use" });
      } else {
        let user = await User.create({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          contact: req.body.contact,
          password: await bcrypt.hash(req.body.password, parseInt(SALT_ROUND)),
        });
        const accessToken = generateAccessToken(user.id);
        const refreshToken = await generateRefreshToken(user.id);
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        return res.status(201).json({
          message: "New user created",
          user: formatUserResponse(user.toJSON(), []),
          orders: [],
          accessToken: accessToken,
        });
      }
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login endpoint
router.post("/login", async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;

    let user = await User.findOne({ where: { email: email } });
    if (!user) {
      return res.status(404).json({ message: "Email not present" });
    }
    user = user.toJSON();
    if (!user.password && user.sub) {
      return res.status(400).json({
        message:
          "This account is linked with Google. Please login using Google to continue.",
      });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const [refreshToken, address, orders] = await Promise.all([
      generateRefreshToken(user.id),
      getAddress(user.id),
      getOrderDetails(user.id),
    ]);

    const accessToken = generateAccessToken(user);

    // Set refresh token as httpOnly cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // HTTPS in production
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Send user data and access token
    res.json({
      success: true,
      accessToken,
      user: formatUserResponse(user, address),
      orders: orders,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Refresh token endpoint
router.post("/refresh", async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res.status(401).json({ error: "Refresh token required" });
    }

    // Check if refresh token exists in Redis
    const tokenData = await validateRefreshToken(refreshToken);
    if (!tokenData) {
      await clearRefreshToken(res, refreshToken);
      return res.status(403).json({ error: "Invalid refresh token" });
    }

    // Verify refresh token JWT
    jwt.verify(refreshToken, JWT_REFRESH_SECRET, async (err, decoded) => {
      if (err) {
        await clearRefreshToken(res, refreshToken);
        return res.status(403).json({ error: "Invalid refresh token" });
      }

      // Find user (replace with database query)
      const user = await User.findByPk(decoded.userId);
      if (!user) {
        await clearRefreshToken(res, refreshToken);
        return res.status(403).json({ error: "User not found" });
      }

      try {
        await removeRefreshToken(refreshToken);
        // Generate new tokens
        const newAccessToken = generateAccessToken(user);
        const newRefreshToken = await generateRefreshToken(user);

        // Set new refresh token cookie
        res.cookie("refreshToken", newRefreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.json({
          success: true,
          accessToken: newAccessToken,
        });
      } catch (error) {
        console.error("Error generating new tokens:", error);
        res.status(500).json({ error: "Failed to refresh token" });
      }
    });
  } catch (error) {
    console.error("Token refresh error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const clearRefreshToken = async (res, token) => {
  res.clearCookie("refreshToken");
  await removeRefreshToken(token);
};

// Logout endpoint
router.post("/logout", async (req, res) => {
  const { refreshToken } = req.cookies;

  if (refreshToken) {
    await removeRefreshToken(refreshToken);
  }

  res.clearCookie("refreshToken");
  res.json({ success: true, message: "Logged out successfully" });
});

// Protected route example
router.get("/api/profile", verifyAccessToken, (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
});

// Check auth status endpoint
router.get("/me", verifyAccessToken, (req, res) => {
  const user = User.findByPk(req.user.userId);
  res.json({
    success: true,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
  });
});
module.exports = router;
