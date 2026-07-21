const express = require('express');
const router = express.Router();
const mapController = require('../controllers/map.controller');

// GET /api/v1/map/districts — district-level crime aggregation with coordinates
router.get('/districts', mapController.getDistrictMapData);

// GET /api/v1/map/cases   — individual FIR points (filterable)
router.get('/cases', mapController.getCasePoints);

module.exports = router;
