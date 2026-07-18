const accusedRepository = require('../repositories/accused.repository');

class AccusedService {
    async getAllAccused() {
        return await accusedRepository.findAll();
    }

    async getAccusedById(id) {
        return await accusedRepository.findById(id);
    }

    async createAccused(data) {
        return await accusedRepository.create(data);
    }

    async updateAccused(id, data) {
        return await accusedRepository.update(id, data);
    }

    async deleteAccused(id) {
        return await accusedRepository.delete(id);
    }
}

module.exports = new AccusedService();
