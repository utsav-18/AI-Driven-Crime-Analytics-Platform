const districtsRepository = require('../repositories/districts.repository');

class DistrictsService {
    async getAllDistricts() {
        return await districtsRepository.findAll();
    }

    async getDistrictById(id) {
        return await districtsRepository.findById(id);
    }

    async createDistrict(data) {
        return await districtsRepository.create(data);
    }

    async updateDistrict(id, data) {
        return await districtsRepository.update(id, data);
    }

    async deleteDistrict(id) {
        return await districtsRepository.delete(id);
    }
}

module.exports = new DistrictsService();
