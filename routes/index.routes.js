// routes/index.routes.js
const express = require("express");
const router = express.Router();
const authRoutes = require("./auth.routes");
const sendResponse = require("../utils/responseHandler");
const prisma = require("../config/prisma");

// Root Route
router.get("/", (req, res) => {
  return sendResponse(res, 200, true, "System Works");
});

// Health Check (Required for Assignment)
router.get("/health", async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    return res.status(200).json({
      status: "healthy",
      application: "running",
      database: "connected",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return res.status(503).json({
      status: "unhealthy",
      application: "running",
      database: "disconnected",
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
});

// Auth Routes
router.use("/auth", authRoutes);

// 404 Route
router.use((req, res) => {
  return sendResponse(res, 404, false, "Route not found");
});

module.exports = router;
