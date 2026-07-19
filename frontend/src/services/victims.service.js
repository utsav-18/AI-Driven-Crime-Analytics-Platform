import api from './api';

export const victimsService = {
    getAll: async () => {
        const response = await api.get('/victims');
        return response.data.data;
    }
};
