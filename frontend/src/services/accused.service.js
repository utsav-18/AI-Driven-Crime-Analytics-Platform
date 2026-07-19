import api from './api';

export const accusedService = {
    getAll: async () => {
        const response = await api.get('/accused');
        return response.data.data;
    }
};
