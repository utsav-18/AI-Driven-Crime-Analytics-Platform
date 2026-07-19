import api from './api';

export const casesService = {
    getAll: async () => {
        const response = await api.get('/cases');
        return response.data.data;
    },
    getById: async (id) => {
        const response = await api.get(`/cases/${id}`);
        return response.data.data;
    }
};
