const express = require('express');
const router = express.Router();
const sectionsController = require('../controllers/sections.controller');
const validate = require('../middleware/validate');
const sectionValidation = require('../validations/section.validation');

router.get('/', sectionsController.getAll);
router.get('/:id', sectionsController.getById);
router.post('/', validate(sectionValidation.createSchema), sectionsController.create);
router.put('/:id', validate(sectionValidation.updateSchema), sectionsController.update);
router.delete('/:id', sectionsController.delete);

module.exports = router;
