import api from './api';

export const aiService = {
    getSummary: async () => {
        const response = await api.get('/ai/summary');
        return response.data.data;
    },
    
    getPredictions: async () => {
        const response = await api.get('/ai/predictions');
        return response.data.data;
    },

    getRiskScores: async () => {
        const response = await api.get('/ai/risk');
        return response.data.data;
    },

    getRepeatOffenders: async () => {
        const response = await api.get('/ai/repeat-offenders');
        return response.data.data;
    },

    getCrimeCategories: async () => {
        const response = await api.get('/ai/categories');
        return response.data.data;
    },

    getInsights: async () => {
        const response = await api.get('/ai/insights');
        return response.data.data;
    }
};
