const casesService = require('../services/cases.service');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');

class CasesController {
    getAll = asyncHandler(async (req, res) => {
        const data = await casesService.getAllCases();
        res.status(200).json(new ApiResponse(200, data, "Cases retrieved successfully"));
    });

    getById = asyncHandler(async (req, res) => {
        const data = await casesService.getCaseById(req.params.id);
        if (!data) throw new ApiError(404, "Case not found");
        res.status(200).json(new ApiResponse(200, data, "Case retrieved successfully"));
    });

    create = asyncHandler(async (req, res) => {
        const data = await casesService.createCase(req.body);
        res.status(201).json(new ApiResponse(201, data, "Case created successfully"));
    });

    update = asyncHandler(async (req, res) => {
        const data = await casesService.updateCase(req.params.id, req.body);
        res.status(200).json(new ApiResponse(200, data, "Case updated successfully"));
    });

    delete = asyncHandler(async (req, res) => {
        await casesService.deleteCase(req.params.id);
        res.status(200).json(new ApiResponse(200, null, "Case deleted successfully"));
    });
}

module.exports = new CasesController();
