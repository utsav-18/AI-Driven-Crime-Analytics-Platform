import api from './api';

export const districtsService = {
    getAll: async () => {
        const response = await api.get('/districts');
        return response.data.data;
    }
};
