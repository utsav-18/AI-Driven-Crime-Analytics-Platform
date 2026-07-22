const express = require('express');
const router = express.Router();
const aiController = require('../controllers/ai.controller');

router.get('/summary', aiController.getSummary);
router.get('/predictions', aiController.getPredictions);
router.get('/risk', aiController.getRiskScores);
router.get('/repeat-offenders', aiController.getRepeatOffenders);
router.get('/categories', aiController.getCrimeCategoryAnalysis);
router.get('/insights', aiController.getInsights);

module.exports = router;
