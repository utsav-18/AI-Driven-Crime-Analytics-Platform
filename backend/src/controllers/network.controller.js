const networkService = require('../services/network.service');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');

class NetworkController {
    /**
     * GET /api/v1/network/graph
     * Returns graph nodes and edges for Cytoscape.js
     */
    getGraphData = asyncHandler(async (req, res) => {
        const data = await networkService.getGraphData();
        res.status(200).json(new ApiResponse(200, data, 'Network graph data retrieved successfully'));
    });
}

module.exports = new NetworkController();
