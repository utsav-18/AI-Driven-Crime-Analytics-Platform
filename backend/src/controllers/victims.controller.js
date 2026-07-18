const victimsService = require('../services/victims.service');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');

class VictimsController {
    getAll = asyncHandler(async (req, res) => {
        const data = await victimsService.getAllVictims();
        res.status(200).json(new ApiResponse(200, data, "Victims retrieved successfully"));
    });

    getById = asyncHandler(async (req, res) => {
        const data = await victimsService.getVictimById(req.params.id);
        if (!data) throw new ApiError(404, "Victim not found");
        res.status(200).json(new ApiResponse(200, data, "Victim retrieved successfully"));
    });

    create = asyncHandler(async (req, res) => {
        const data = await victimsService.createVictim(req.body);
        res.status(201).json(new ApiResponse(201, data, "Victim created successfully"));
    });

    update = asyncHandler(async (req, res) => {
        const data = await victimsService.updateVictim(req.params.id, req.body);
        res.status(200).json(new ApiResponse(200, data, "Victim updated successfully"));
    });

    delete = asyncHandler(async (req, res) => {
        await victimsService.deleteVictim(req.params.id);
        res.status(200).json(new ApiResponse(200, null, "Victim deleted successfully"));
    });
}

module.exports = new VictimsController();
