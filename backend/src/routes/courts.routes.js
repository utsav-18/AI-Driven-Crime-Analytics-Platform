const express = require('express');
const router = express.Router();
const courtsController = require('../controllers/courts.controller');
const validate = require('../middleware/validate');
const courtValidation = require('../validations/court.validation');

router.get('/', courtsController.getAll);
router.get('/:id', courtsController.getById);
router.post('/', validate(courtValidation.createSchema), courtsController.create);
router.put('/:id', validate(courtValidation.updateSchema), courtsController.update);
router.delete('/:id', courtsController.delete);

module.exports = router;
