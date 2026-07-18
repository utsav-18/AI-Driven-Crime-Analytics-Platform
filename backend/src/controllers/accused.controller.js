const accusedService = require('../services/accused.service');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');

class AccusedController {
    getAll = asyncHandler(async (req, res) => {
        const data = await accusedService.getAllAccused();
        res.status(200).json(new ApiResponse(200, data, "Accused retrieved successfully"));
    });

    getById = asyncHandler(async (req, res) => {
        const data = await accusedService.getAccusedById(req.params.id);
        if (!data) throw new ApiError(404, "Accused not found");
        res.status(200).json(new ApiResponse(200, data, "Accused retrieved successfully"));
    });

    create = asyncHandler(async (req, res) => {
        const data = await accusedService.createAccused(req.body);
        res.status(201).json(new ApiResponse(201, data, "Accused created successfully"));
    });

    update = asyncHandler(async (req, res) => {
        const data = await accusedService.updateAccused(req.params.id, req.body);
        res.status(200).json(new ApiResponse(200, data, "Accused updated successfully"));
    });

    delete = asyncHandler(async (req, res) => {
        await accusedService.deleteAccused(req.params.id);
        res.status(200).json(new ApiResponse(200, null, "Accused deleted successfully"));
    });
}

module.exports = new AccusedController();
