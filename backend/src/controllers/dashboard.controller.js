const dashboardService = require('../services/dashboard.service');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');

class DashboardController {
    getMetrics = asyncHandler(async (req, res) => {
        const metrics = await dashboardService.getDashboardMetrics();
        res.status(200).json(new ApiResponse(200, metrics, "Dashboard metrics retrieved successfully"));
    });
}

module.exports = new DashboardController();
