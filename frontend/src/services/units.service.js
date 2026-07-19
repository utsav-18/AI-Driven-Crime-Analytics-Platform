import api from './api';

export const unitsService = {
    getAll: async () => {
        const response = await api.get('/units');
        return response.data.data;
    }
};
