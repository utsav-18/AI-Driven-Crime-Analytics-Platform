const crimeCategoriesRepository = require('../repositories/crimeCategories.repository');

class CrimeCategoriesService {
    async getAllCrimeCategories() {
        return await crimeCategoriesRepository.findAll();
    }

    async getCrimeCategoryById(id) {
        return await crimeCategoriesRepository.findById(id);
    }

    async createCrimeCategory(data) {
        return await crimeCategoriesRepository.create(data);
    }

    async updateCrimeCategory(id, data) {
        return await crimeCategoriesRepository.update(id, data);
    }

    async deleteCrimeCategory(id) {
        return await crimeCategoriesRepository.delete(id);
    }
}

module.exports = new CrimeCategoriesService();
