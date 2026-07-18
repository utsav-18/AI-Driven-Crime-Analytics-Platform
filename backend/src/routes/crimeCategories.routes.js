const express = require('express');
const router = express.Router();
const crimeCategoriesController = require('../controllers/crimeCategories.controller');
const validate = require('../middleware/validate');
const crimeCategoryValidation = require('../validations/crimeCategory.validation');

router.get('/', crimeCategoriesController.getAll);
router.get('/:id', crimeCategoriesController.getById);
router.post('/', validate(crimeCategoryValidation.createSchema), crimeCategoriesController.create);
router.put('/:id', validate(crimeCategoryValidation.updateSchema), crimeCategoriesController.update);
router.delete('/:id', crimeCategoriesController.delete);

module.exports = router;
