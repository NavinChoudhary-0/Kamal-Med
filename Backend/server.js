const express = require("express");
const rateLimit = require('express-rate-limit');
const cors = require("cors");
const cookieParser = require('cookie-parser');
const { sequelize } = require("./models/index");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
})); 
app.use(express.json());

// Routes
const productsRouter = require("./routes/products");
const authRoute = require("./routes/authRoute");

// More permissive limiter for general API endpoints
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000,
  message: 'Too many requests, please try again later.',
  standardHeaders: true, // Return rate limit info in headers (Ratify spec)
  legacyHeaders: false, // Disable older X-RateLimit-* headers
  handler: (req, res, next, options) => {
    // Log exceeded attempts with IP
    console.log(`Rate limit exceeded for IP: ${req.ip} at ${new Date().toISOString()}`);
    res.status(options.statusCode).send(options.message);
  },
});

// Keep strict limiter for auth routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 500,
  message: 'Too many authentication attempts, please try again later.',
  standardHeaders: true, // Return rate limit info in headers (Ratify spec)
  legacyHeaders: false, // Disable older X-RateLimit-* headers
  handler: (req, res, next, options) => {
    const { used, limit } = req.rateLimit || { used: 'unknown', limit: 'unknown' };
    // Log exceeded attempts with IP
    console.log(`Rate limit exceeded for IP: ${req.ip} at ${new Date().toISOString()} Used: ${used}, Limit: ${limit}`);
    res.status(options.statusCode).send(options.message);
  },
});

app.use(cookieParser());
// Apply general rate limiting to all requests
app.use(apiLimiter);
app.use("/api/products", productsRouter);
// Apply stricter rate limiting to auth routes
app.use("/auth", [authLimiter, authRoute]);


// Database connection and server start
async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("Database connection established successfully.");
    // If you want to create tables, uncomment the following line:
    sequelize
    .sync()
    // .sync({ alter: true })
    .then(() => {
      console.log('✅ Tables created successfully!');
    })
    .catch((error) => {
      console.error('❌ Unable to create tables:', error);
    });

    app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

startServer();
