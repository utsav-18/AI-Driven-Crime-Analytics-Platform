const express = require('express');
const router = express.Router();
const victimsController = require('../controllers/victims.controller');
const validate = require('../middleware/validate');
const victimValidation = require('../validations/victim.validation');

router.get('/', victimsController.getAll);
router.get('/:id', victimsController.getById);
router.post('/', validate(victimValidation.createSchema), victimsController.create);
router.put('/:id', validate(victimValidation.updateSchema), victimsController.update);
router.delete('/:id', victimsController.delete);

module.exports = router;
