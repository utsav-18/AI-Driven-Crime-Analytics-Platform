const aiService = require('../services/ai.service');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');

class AIController {
    getSummary = asyncHandler(async (req, res) => {
        const data = await aiService.getSummary();
        res.status(200).json(new ApiResponse(200, data, 'AI Summary retrieved successfully'));
    });

    getPredictions = asyncHandler(async (req, res) => {
        const data = await aiService.getPredictions();
        res.status(200).json(new ApiResponse(200, data, 'Crime predictions retrieved successfully'));
    });

    getRiskScores = asyncHandler(async (req, res) => {
        const data = await aiService.getRiskScores();
        res.status(200).json(new ApiResponse(200, data, 'District risk scores retrieved successfully'));
    });

    getRepeatOffenders = asyncHandler(async (req, res) => {
        const data = await aiService.getRepeatOffenders();
        res.status(200).json(new ApiResponse(200, data, 'Repeat offenders retrieved successfully'));
    });

    getCrimeCategoryAnalysis = asyncHandler(async (req, res) => {
        const data = await aiService.getCrimeCategoryAnalysis();
        res.status(200).json(new ApiResponse(200, data, 'Crime category analysis retrieved successfully'));
    });

    getInsights = asyncHandler(async (req, res) => {
        const data = await aiService.getInsights();
        res.status(200).json(new ApiResponse(200, data, 'Dynamic AI insights retrieved successfully'));
    });
}

module.exports = new AIController();
