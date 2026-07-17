const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root Route
app.get("/", (req, res) => {
    res.json({
        message: "Crime Analytics Backend API",
        version: "1.0.0",
        status: "Running"
    });
});

// Health Check Route
app.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Backend is healthy"
    });
});

module.exports = app;