const express = require('express');
const router = express.Router();
const employeesController = require('../controllers/employees.controller');
const validate = require('../middleware/validate');
const employeeValidation = require('../validations/employee.validation');

router.get('/', employeesController.getAll);
router.get('/:id', employeesController.getById);
router.post('/', validate(employeeValidation.createSchema), employeesController.create);
router.put('/:id', validate(employeeValidation.updateSchema), employeesController.update);
router.delete('/:id', employeesController.delete);

module.exports = router;
