const casesRepository = require('../repositories/cases.repository');

class CasesService {
    async getAllCases() {
        return await casesRepository.findAll();
    }

    async getCaseById(id) {
        return await casesRepository.findById(id);
    }

    async createCase(data) {
        return await casesRepository.create(data);
    }

    async updateCase(id, data) {
        return await casesRepository.update(id, data);
    }

    async deleteCase(id) {
        return await casesRepository.delete(id);
    }
}

module.exports = new CasesService();
