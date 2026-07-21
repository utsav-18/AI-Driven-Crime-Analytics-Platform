const express = require('express');
const router = express.Router();
const networkController = require('../controllers/network.controller');

// GET /api/v1/network/graph - fetch complete nodes and edges
router.get('/graph', networkController.getGraphData);

module.exports = router;
