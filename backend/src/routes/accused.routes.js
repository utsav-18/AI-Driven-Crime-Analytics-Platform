const express = require('express');
const router = express.Router();
const accusedController = require('../controllers/accused.controller');
const validate = require('../middleware/validate');
const accusedValidation = require('../validations/accused.validation');

router.get('/', accusedController.getAll);
router.get('/:id', accusedController.getById);
router.post('/', validate(accusedValidation.createSchema), accusedController.create);
router.put('/:id', validate(accusedValidation.updateSchema), accusedController.update);
router.delete('/:id', accusedController.delete);

module.exports = router;
