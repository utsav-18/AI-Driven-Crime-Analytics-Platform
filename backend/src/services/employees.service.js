const employeesRepository = require('../repositories/employees.repository');

class EmployeesService {
    async getAllEmployees() {
        return await employeesRepository.findAll();
    }

    async getEmployeeById(id) {
        return await employeesRepository.findById(id);
    }

    async createEmployee(data) {
        return await employeesRepository.create(data);
    }

    async updateEmployee(id, data) {
        return await employeesRepository.update(id, data);
    }

    async deleteEmployee(id) {
        return await employeesRepository.delete(id);
    }
}

module.exports = new EmployeesService();
