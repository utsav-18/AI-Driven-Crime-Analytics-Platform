const express = require('express');
const router = express.Router();
const districtsController = require('../controllers/districts.controller');
const validate = require('../middleware/validate');
const districtValidation = require('../validations/district.validation');

router.get('/', districtsController.getAll);
router.get('/:id', districtsController.getById);
router.post('/', validate(districtValidation.createSchema), districtsController.create);
router.put('/:id', validate(districtValidation.updateSchema), districtsController.update);
router.delete('/:id', districtsController.delete);

module.exports = router;
