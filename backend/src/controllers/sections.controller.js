const sectionsService = require('../services/sections.service');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');

class SectionsController {
    getAll = asyncHandler(async (req, res) => {
        const data = await sectionsService.getAllSections();
        res.status(200).json(new ApiResponse(200, data, "Sections retrieved successfully"));
    });

    getById = asyncHandler(async (req, res) => {
        const data = await sectionsService.getSectionById(req.params.id);
        if (!data) throw new ApiError(404, "Section not found");
        res.status(200).json(new ApiResponse(200, data, "Section retrieved successfully"));
    });

    create = asyncHandler(async (req, res) => {
        const data = await sectionsService.createSection(req.body);
        res.status(201).json(new ApiResponse(201, data, "Section created successfully"));
    });

    update = asyncHandler(async (req, res) => {
        const data = await sectionsService.updateSection(req.params.id, req.body);
        res.status(200).json(new ApiResponse(200, data, "Section updated successfully"));
    });

    delete = asyncHandler(async (req, res) => {
        await sectionsService.deleteSection(req.params.id);
        res.status(200).json(new ApiResponse(200, null, "Section deleted successfully"));
    });
}

module.exports = new SectionsController();
