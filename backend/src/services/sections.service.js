const sectionsRepository = require('../repositories/sections.repository');

class SectionsService {
    async getAllSections() {
        return await sectionsRepository.findAll();
    }

    async getSectionById(id) {
        return await sectionsRepository.findById(id);
    }

    async createSection(data) {
        return await sectionsRepository.create(data);
    }

    async updateSection(id, data) {
        return await sectionsRepository.update(id, data);
    }

    async deleteSection(id) {
        return await sectionsRepository.delete(id);
    }
}

module.exports = new SectionsService();
