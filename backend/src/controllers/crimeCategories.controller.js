const crimeCategoriesService = require('../services/crimeCategories.service');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');

class CrimeCategoriesController {
    getAll = asyncHandler(async (req, res) => {
        const data = await crimeCategoriesService.getAllCrimeCategories();
        res.status(200).json(new ApiResponse(200, data, "CrimeCategories retrieved successfully"));
    });

    getById = asyncHandler(async (req, res) => {
        const data = await crimeCategoriesService.getCrimeCategoryById(req.params.id);
        if (!data) throw new ApiError(404, "CrimeCategory not found");
        res.status(200).json(new ApiResponse(200, data, "CrimeCategory retrieved successfully"));
    });

    create = asyncHandler(async (req, res) => {
        const data = await crimeCategoriesService.createCrimeCategory(req.body);
        res.status(201).json(new ApiResponse(201, data, "CrimeCategory created successfully"));
    });

    update = asyncHandler(async (req, res) => {
        const data = await crimeCategoriesService.updateCrimeCategory(req.params.id, req.body);
        res.status(200).json(new ApiResponse(200, data, "CrimeCategory updated successfully"));
    });

    delete = asyncHandler(async (req, res) => {
        await crimeCategoriesService.deleteCrimeCategory(req.params.id);
        res.status(200).json(new ApiResponse(200, null, "CrimeCategory deleted successfully"));
    });
}

module.exports = new CrimeCategoriesController();
