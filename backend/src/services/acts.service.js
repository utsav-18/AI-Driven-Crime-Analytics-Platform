const actsRepository = require('../repositories/acts.repository');

class ActsService {
    async getAllActs() {
        return await actsRepository.findAll();
    }

    async getActById(id) {
        return await actsRepository.findById(id);
    }

    async createAct(data) {
        return await actsRepository.create(data);
    }

    async updateAct(id, data) {
        return await actsRepository.update(id, data);
    }

    async deleteAct(id) {
        return await actsRepository.delete(id);
    }
}

module.exports = new ActsService();
