const unitsService = require('../services/units.service');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');

class UnitsController {
    getAll = asyncHandler(async (req, res) => {
        const data = await unitsService.getAllUnits();
        res.status(200).json(new ApiResponse(200, data, "Units retrieved successfully"));
    });

    getById = asyncHandler(async (req, res) => {
        const data = await unitsService.getUnitById(req.params.id);
        if (!data) throw new ApiError(404, "Unit not found");
        res.status(200).json(new ApiResponse(200, data, "Unit retrieved successfully"));
    });

    create = asyncHandler(async (req, res) => {
        const data = await unitsService.createUnit(req.body);
        res.status(201).json(new ApiResponse(201, data, "Unit created successfully"));
    });

    update = asyncHandler(async (req, res) => {
        const data = await unitsService.updateUnit(req.params.id, req.body);
        res.status(200).json(new ApiResponse(200, data, "Unit updated successfully"));
    });

    delete = asyncHandler(async (req, res) => {
        await unitsService.deleteUnit(req.params.id);
        res.status(200).json(new ApiResponse(200, null, "Unit deleted successfully"));
    });
}

module.exports = new UnitsController();
