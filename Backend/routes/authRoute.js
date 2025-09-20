const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const redis = require("redis");
const { getOrderDetails, getAddress, formatUserResponse } = require("./user");

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
  // For Redis Cloud or other managed services
  url: process.env.REDIS_URL || undefined,
});

// Handle Redis connection
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
const generateAccessToken = (user) => {
  return jwt.sign(
    {
      userId: user.id,
      email: user.email,
    },
    JWT_ACCESS_SECRET,
    { expiresIn: ACCESS_TOKEN_EXPIRY }
  );
};

const generateRefreshToken = async (user) => {
  const token = jwt.sign({ userId: user.id }, JWT_REFRESH_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRY,
  });

  // Store refresh token in Redis with expiration
  const tokenKey = `refresh_token:${token}`;
  const tokenData = {
    userId: user.id,
    email: user.email,
    createdAt: new Date().toISOString(),
  };

  try {
    await redisClient.setEx(
      tokenKey,
      7 * 24 * 60 * 60, // 7 days in seconds
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
    console.error("Error validating refresh token in Redis:", error);
    return null;
  }
};

// Helper function to remove refresh token from Redis
const removeRefreshToken = async (token) => {
  const tokenKey = `refresh_token:${token}`;
  try {
    await redisClient.del(tokenKey);
  } catch (error) {
    console.error("Error removing refresh token from Redis:", error);
  }
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

const verifyAccessToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ error: "Access token required" });
  }

  jwt.verify(token, JWT_ACCESS_SECRET, (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ error: "Access token expired" });
      }
      return res.status(403).json({ error: "Invalid access token" });
    }
    req.user = decoded;
    next();
  });
};

router.post("/addUser", async (req, res) => {
  try {
    // Generate tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = await generateRefreshToken(user);

    if (req.body.sub) {
      const existingUser = await User.findOne({
        where: { sub: req.body.sub },
        attributes: ["id", "firstName", "lastName", "email", "contact"],
      });
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // HTTPS in production
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });
      console.log(existingUser);
      if (existingUser) {
        const address = await getAddress(existingUser.id);
        const orders = await getOrderDetails(existingUser.id);

        return res.status(200).json({
          message: "Successfully logged in with Google",
          user: formatUserResponse(existingUser, address),
          orders: orders,
          accessToken: accessToken,
        });
      } else {
        const newUserAdded = await User.create(req.body);
        return res.status(201).json({
          message: "New user created",
          user: formatUserResponse(newUserAdded, []),
          orders: [],
          accessToken: accessToken,
        });
      }
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
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production", // HTTPS in production
          sameSite: "strict",
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
        const newUserAdded = await User.create(req.body);
        return res.status(201).json({
          message: "New user created",
          user: newUserAdded,
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
router.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const users = await User.findAll({ where: { email: email } });
    let user = users.map((u) => u.toJSON());
    if (user.length === 0) {
      return res.status(404).json({ message: "Email not present" });
    }
    user = user[0];
    if (!user.password && user.sub) {
      return res.status(400).json({
        message:
          "This account is linked with Google. Please login using Google, or set up a password to continue.",
      });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = await generateRefreshToken(user);

    // Set refresh token as httpOnly cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // HTTPS in production
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    const address = await getAddress(user.id);
    const orders = await getOrderDetails(user.id);
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
router.post("/auth/refresh", async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res.status(401).json({ error: "Refresh token required" });
    }

    // Check if refresh token exists in Redis
    const tokenData = await validateRefreshToken(refreshToken);
    if (!tokenData) {
      return res.status(403).json({ error: "Invalid refresh token" });
    }

    // Verify refresh token JWT
    jwt.verify(refreshToken, JWT_REFRESH_SECRET, async (err, decoded) => {
      if (err) {
        await removeRefreshToken(refreshToken); // Remove invalid token
        return res.status(403).json({ error: "Invalid refresh token" });
      }

      // Find user (replace with database query)
      const user = users.find((u) => u.id === decoded.userId);
      if (!user) {
        await removeRefreshToken(refreshToken);
        return res.status(403).json({ error: "User not found" });
      }

      try {
        // Generate new tokens
        const newAccessToken = generateAccessToken(user);
        const newRefreshToken = await generateRefreshToken(user);

        // Remove old refresh token and the new one is already stored
        await removeRefreshToken(refreshToken);

        // Set new refresh token cookie
        res.cookie("refreshToken", newRefreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        // Send new access token and user data
        res.json({
          success: true,
          accessToken: newAccessToken,
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          },
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

// Logout endpoint
router.post("/auth/logout", async (req, res) => {
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
router.get("/auth/me", verifyAccessToken, (req, res) => {
  const user = users.find((u) => u.id === req.user.userId);
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
