const courtsService = require('../services/courts.service');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');

class CourtsController {
    getAll = asyncHandler(async (req, res) => {
        const data = await courtsService.getAllCourts();
        res.status(200).json(new ApiResponse(200, data, "Courts retrieved successfully"));
    });

    getById = asyncHandler(async (req, res) => {
        const data = await courtsService.getCourtById(req.params.id);
        if (!data) throw new ApiError(404, "Court not found");
        res.status(200).json(new ApiResponse(200, data, "Court retrieved successfully"));
    });

    create = asyncHandler(async (req, res) => {
        const data = await courtsService.createCourt(req.body);
        res.status(201).json(new ApiResponse(201, data, "Court created successfully"));
    });

    update = asyncHandler(async (req, res) => {
        const data = await courtsService.updateCourt(req.params.id, req.body);
        res.status(200).json(new ApiResponse(200, data, "Court updated successfully"));
    });

    delete = asyncHandler(async (req, res) => {
        await courtsService.deleteCourt(req.params.id);
        res.status(200).json(new ApiResponse(200, null, "Court deleted successfully"));
    });
}

module.exports = new CourtsController();
