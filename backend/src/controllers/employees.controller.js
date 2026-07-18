const employeesService = require('../services/employees.service');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');

class EmployeesController {
    getAll = asyncHandler(async (req, res) => {
        const data = await employeesService.getAllEmployees();
        res.status(200).json(new ApiResponse(200, data, "Employees retrieved successfully"));
    });

    getById = asyncHandler(async (req, res) => {
        const data = await employeesService.getEmployeeById(req.params.id);
        if (!data) throw new ApiError(404, "Employee not found");
        res.status(200).json(new ApiResponse(200, data, "Employee retrieved successfully"));
    });

    create = asyncHandler(async (req, res) => {
        const data = await employeesService.createEmployee(req.body);
        res.status(201).json(new ApiResponse(201, data, "Employee created successfully"));
    });

    update = asyncHandler(async (req, res) => {
        const data = await employeesService.updateEmployee(req.params.id, req.body);
        res.status(200).json(new ApiResponse(200, data, "Employee updated successfully"));
    });

    delete = asyncHandler(async (req, res) => {
        await employeesService.deleteEmployee(req.params.id);
        res.status(200).json(new ApiResponse(200, null, "Employee deleted successfully"));
    });
}

module.exports = new EmployeesController();
