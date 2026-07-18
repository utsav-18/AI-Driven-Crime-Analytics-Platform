const express = require('express');
const router = express.Router();
const actsController = require('../controllers/acts.controller');
const validate = require('../middleware/validate');
const actValidation = require('../validations/act.validation');

router.get('/', actsController.getAll);
router.get('/:id', actsController.getById);
router.post('/', validate(actValidation.createSchema), actsController.create);
router.put('/:id', validate(actValidation.updateSchema), actsController.update);
router.delete('/:id', actsController.delete);

module.exports = router;
