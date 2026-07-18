const express = require('express');
const router = express.Router();
const unitsController = require('../controllers/units.controller');
const validate = require('../middleware/validate');
const unitValidation = require('../validations/unit.validation');

router.get('/', unitsController.getAll);
router.get('/:id', unitsController.getById);
router.post('/', validate(unitValidation.createSchema), unitsController.create);
router.put('/:id', validate(unitValidation.updateSchema), unitsController.update);
router.delete('/:id', unitsController.delete);

module.exports = router;
