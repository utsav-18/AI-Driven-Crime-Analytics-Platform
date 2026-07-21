import api from './api';

export const mapService = {
    getDistrictMapData: async () => {
        const response = await api.get('/map/districts');
        return response.data.data;
    },
    getCasePoints: async (filters = {}) => {
        const params = new URLSearchParams();
        if (filters.districtId) params.append('districtId', filters.districtId);
        if (filters.crimeHeadId) params.append('crimeHeadId', filters.crimeHeadId);
        if (filters.status) params.append('status', filters.status);
        if (filters.year) params.append('year', filters.year);
        const response = await api.get(`/map/cases?${params.toString()}`);
        return response.data.data;
    }
};
