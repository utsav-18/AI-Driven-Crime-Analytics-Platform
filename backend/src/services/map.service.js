const mapRepository = require('../repositories/map.repository');

// Static coordinate lookup for Karnataka districts.
// Will be superseded by real coordinates when the official dataset arrives.
const DISTRICT_COORDS = {
    'Bengaluru City':   { lat: 12.9716, lng: 77.5946 },
    'Mysuru':           { lat: 12.2958, lng: 76.6394 },
    'Hubballi-Dharwad': { lat: 15.3647, lng: 75.1240 },
    'Mangaluru':        { lat: 12.9141, lng: 74.8560 },
    'Belagavi':         { lat: 15.8497, lng: 74.4977 },
    'Kalaburagi':       { lat: 17.3297, lng: 76.8343 },
    'Shivamogga':       { lat: 13.9299, lng: 75.5681 },
    'Tumakuru':         { lat: 13.3409, lng: 77.1010 },
    'Vijayapura':       { lat: 16.8302, lng: 75.7100 },
    'Ballari':          { lat: 15.1394, lng: 76.9214 },
    'Davanagere':       { lat: 14.4644, lng: 75.9218 },
    'Hassan':           { lat: 13.0068, lng: 76.1004 },
    'Udupi':            { lat: 13.3409, lng: 74.7421 },
    'Chikkamagaluru':   { lat: 13.3153, lng: 75.7754 },
    'Raichur':          { lat: 16.2120, lng: 77.3566 },
    'Kolar':            { lat: 13.1362, lng: 78.1294 },
    'Bagalkote':        { lat: 16.1675, lng: 75.6965 },
    'Chamarajanagar':   { lat: 11.9261, lng: 76.9435 },
    'Chikkaballapura':  { lat: 13.4355, lng: 77.7315 },
    'Chitradurga':      { lat: 14.2297, lng: 76.4010 },
    'Dakshina Kannada': { lat: 12.8438, lng: 75.2479 },
    'Gadag':            { lat: 15.4315, lng: 75.6249 },
    'Haveri':           { lat: 14.7957, lng: 75.3985 },
    'Kodagu':           { lat: 12.3375, lng: 75.8069 },
    'Koppal':           { lat: 15.3485, lng: 76.1547 },
    'Mandya':           { lat: 12.5218, lng: 76.8951 },
    'Uttara Kannada':   { lat: 14.7963, lng: 74.6998 },
    'Yadgir':           { lat: 16.7617, lng: 77.1382 },
    'Bidar':            { lat: 17.9104, lng: 77.5199 },
    'Bengaluru Rural':  { lat: 13.2062, lng: 77.5044 },
    'Dharwad':          { lat: 15.4589, lng: 75.0078 },
};

class MapService {
    async getDistrictMapData() {
        const rows = await mapRepository.getDistrictMapData();

        return rows.map(row => {
            const coords = DISTRICT_COORDS[row.district_name] || { lat: 15.3173, lng: 75.7139 };
            return {
                districtId:       Number(row.district_id),
                districtName:     row.district_name,
                totalCrimes:      Number(row.total_crimes),
                activeCases:      Number(row.active_cases),
                closedCases:      Number(row.closed_cases),
                topCrimeCategory: row.top_crime_category || 'N/A',
                lat:              coords.lat,
                lng:              coords.lng,
            };
        });
    }

    async getCasePoints(filters) {
        const rows = await mapRepository.getCasePoints(filters);
        return rows.map(row => ({
            id:           Number(row.id),
            firNumber:    row.fir_number,
            status:       row.status,
            lat:          Number(row.latitude),
            lng:          Number(row.longitude),
            date:         row.occurrence_date,
            districtName: row.district_name,
            crimeName:    row.crime_name,
        }));
    }
}

module.exports = new MapService();
