const express = require("express");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
const ApiError = require("./utils/ApiError");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check Route
app.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Backend is healthy"
    });
});

// Import Routes
const casesRoutes = require('./routes/cases.routes');
const victimsRoutes = require('./routes/victims.routes');
const accusedRoutes = require('./routes/accused.routes');
const districtsRoutes = require('./routes/districts.routes');
const unitsRoutes = require('./routes/units.routes');
const crimeCategoriesRoutes = require('./routes/crimeCategories.routes');
const actsRoutes = require('./routes/acts.routes');
const sectionsRoutes = require('./routes/sections.routes');
const courtsRoutes = require('./routes/courts.routes');
const employeesRoutes = require('./routes/employees.routes');
const dashboardRoutes = require('./routes/dashboard.routes');
const mapRoutes = require('./routes/map.routes');

// Mount Routes
app.use('/api/v1/cases', casesRoutes);
app.use('/api/v1/victims', victimsRoutes);
app.use('/api/v1/accused', accusedRoutes);
app.use('/api/v1/districts', districtsRoutes);
app.use('/api/v1/units', unitsRoutes);
app.use('/api/v1/crime-categories', crimeCategoriesRoutes);
app.use('/api/v1/acts', actsRoutes);
app.use('/api/v1/sections', sectionsRoutes);
app.use('/api/v1/courts', courtsRoutes);
app.use('/api/v1/employees', employeesRoutes);
app.use('/api/v1/dashboard', dashboardRoutes);
app.use('/api/v1/map', mapRoutes);

// 404 handler for undefined API routes
app.use((req, res, next) => {
    next(new ApiError(404, "Not found"));
});

// Global Error Handler
app.use(errorHandler);

module.exports = app;