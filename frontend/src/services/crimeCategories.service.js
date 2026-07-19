import api from './api';

export const crimeCategoriesService = {
    getAll: async () => {
        const response = await api.get('/crime-categories');
        return response.data.data;
    }
};
