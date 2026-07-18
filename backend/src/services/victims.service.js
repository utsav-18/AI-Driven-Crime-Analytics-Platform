const victimsRepository = require('../repositories/victims.repository');

class VictimsService {
    async getAllVictims() {
        return await victimsRepository.findAll();
    }

    async getVictimById(id) {
        return await victimsRepository.findById(id);
    }

    async createVictim(data) {
        return await victimsRepository.create(data);
    }

    async updateVictim(id, data) {
        return await victimsRepository.update(id, data);
    }

    async deleteVictim(id) {
        return await victimsRepository.delete(id);
    }
}

module.exports = new VictimsService();
