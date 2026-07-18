const express = require('express');
const router = express.Router();
const casesController = require('../controllers/cases.controller');
const validate = require('../middleware/validate');
const caseValidation = require('../validations/case.validation');

router.get('/', casesController.getAll);
router.get('/:id', casesController.getById);
router.post('/', validate(caseValidation.createSchema), casesController.create);
router.put('/:id', validate(caseValidation.updateSchema), casesController.update);
router.delete('/:id', casesController.delete);

module.exports = router;
