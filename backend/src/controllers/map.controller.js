const mapService = require('../services/map.service');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');

class MapController {
    /**
     * GET /api/v1/map/districts
     * Returns per-district crime aggregation with coordinates.
     */
    getDistrictMapData = asyncHandler(async (req, res) => {
        const data = await mapService.getDistrictMapData();
        res.status(200).json(new ApiResponse(200, data, 'District map data retrieved successfully'));
    });

    /**
     * GET /api/v1/map/cases
     * Returns individual FIR points that have lat/lng.
     * Supports query params: districtId, crimeHeadId, status, year
     */
    getCasePoints = asyncHandler(async (req, res) => {
        const { districtId, crimeHeadId, status, year } = req.query;
        const filters = { districtId, crimeHeadId, status, year };
        const data = await mapService.getCasePoints(filters);
        res.status(200).json(new ApiResponse(200, data, 'Case map points retrieved successfully'));
    });
}

module.exports = new MapController();
