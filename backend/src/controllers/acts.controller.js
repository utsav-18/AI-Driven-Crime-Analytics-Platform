const actsService = require('../services/acts.service');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');

class ActsController {
    getAll = asyncHandler(async (req, res) => {
        const data = await actsService.getAllActs();
        res.status(200).json(new ApiResponse(200, data, "Acts retrieved successfully"));
    });

    getById = asyncHandler(async (req, res) => {
        const data = await actsService.getActById(req.params.id);
        if (!data) throw new ApiError(404, "Act not found");
        res.status(200).json(new ApiResponse(200, data, "Act retrieved successfully"));
    });

    create = asyncHandler(async (req, res) => {
        const data = await actsService.createAct(req.body);
        res.status(201).json(new ApiResponse(201, data, "Act created successfully"));
    });

    update = asyncHandler(async (req, res) => {
        const data = await actsService.updateAct(req.params.id, req.body);
        res.status(200).json(new ApiResponse(200, data, "Act updated successfully"));
    });

    delete = asyncHandler(async (req, res) => {
        await actsService.deleteAct(req.params.id);
        res.status(200).json(new ApiResponse(200, null, "Act deleted successfully"));
    });
}

module.exports = new ActsController();
