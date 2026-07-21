import api from './api';

export const networkService = {
    getGraphData: async () => {
        const response = await api.get('/network/graph');
        return response.data.data;
    }
};
