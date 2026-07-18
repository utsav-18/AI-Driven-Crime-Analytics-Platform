const unitsRepository = require('../repositories/units.repository');

class UnitsService {
    async getAllUnits() {
        return await unitsRepository.findAll();
    }

    async getUnitById(id) {
        return await unitsRepository.findById(id);
    }

    async createUnit(data) {
        return await unitsRepository.create(data);
    }

    async updateUnit(id, data) {
        return await unitsRepository.update(id, data);
    }

    async deleteUnit(id) {
        return await unitsRepository.delete(id);
    }
}

module.exports = new UnitsService();
