const districtsService = require('../services/districts.service');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');

class DistrictsController {
    getAll = asyncHandler(async (req, res) => {
        const data = await districtsService.getAllDistricts();
        res.status(200).json(new ApiResponse(200, data, "Districts retrieved successfully"));
    });

    getById = asyncHandler(async (req, res) => {
        const data = await districtsService.getDistrictById(req.params.id);
        if (!data) throw new ApiError(404, "District not found");
        res.status(200).json(new ApiResponse(200, data, "District retrieved successfully"));
    });

    create = asyncHandler(async (req, res) => {
        const data = await districtsService.createDistrict(req.body);
        res.status(201).json(new ApiResponse(201, data, "District created successfully"));
    });

    update = asyncHandler(async (req, res) => {
        const data = await districtsService.updateDistrict(req.params.id, req.body);
        res.status(200).json(new ApiResponse(200, data, "District updated successfully"));
    });

    delete = asyncHandler(async (req, res) => {
        await districtsService.deleteDistrict(req.params.id);
        res.status(200).json(new ApiResponse(200, null, "District deleted successfully"));
    });
}

module.exports = new DistrictsController();
