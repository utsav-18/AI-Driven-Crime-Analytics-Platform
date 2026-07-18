const courtsRepository = require('../repositories/courts.repository');

class CourtsService {
    async getAllCourts() {
        return await courtsRepository.findAll();
    }

    async getCourtById(id) {
        return await courtsRepository.findById(id);
    }

    async createCourt(data) {
        return await courtsRepository.create(data);
    }

    async updateCourt(id, data) {
        return await courtsRepository.update(id, data);
    }

    async deleteCourt(id) {
        return await courtsRepository.delete(id);
    }
}

module.exports = new CourtsService();
