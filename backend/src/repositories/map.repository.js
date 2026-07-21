const db = require('../config/db');

class MapRepository {
    /**
     * Returns per-district crime aggregation with coordinates
     * for the crime map visualisation.
     */
    async getDistrictMapData() {
        const result = await db.query(`
            SELECT
                d.id                                    AS district_id,
                d.district_name,
                COUNT(c.id)                             AS total_crimes,
                COUNT(CASE WHEN c.status = 'Closed'           THEN 1 END) AS closed_cases,
                COUNT(CASE WHEN c.status != 'Closed'
                           AND c.status IS NOT NULL            THEN 1 END) AS active_cases,
                MODE() WITHIN GROUP (
                    ORDER BY ch.crime_name
                )                                       AS top_crime_category
            FROM districts d
            LEFT JOIN case_master c  ON d.id = c.district_id
            LEFT JOIN crime_heads ch ON c.crime_head_id = ch.id
            GROUP BY d.id, d.district_name
            ORDER BY total_crimes DESC
        `);
        return result.rows;
    }

    /**
     * Returns individual case points with lat/lng for plotting on map.
     * Only returns cases that have coordinates set.
     */
    async getCasePoints(filters = {}) {
        const conditions = ['c.latitude IS NOT NULL', 'c.longitude IS NOT NULL'];
        const params = [];
        let idx = 1;

        if (filters.districtId) {
            conditions.push(`c.district_id = $${idx++}`);
            params.push(filters.districtId);
        }
        if (filters.crimeHeadId) {
            conditions.push(`c.crime_head_id = $${idx++}`);
            params.push(filters.crimeHeadId);
        }
        if (filters.status) {
            conditions.push(`c.status = $${idx++}`);
            params.push(filters.status);
        }
        if (filters.year) {
            conditions.push(`EXTRACT(YEAR FROM c.occurrence_date) = $${idx++}`);
            params.push(Number(filters.year));
        }

        const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

        const result = await db.query(`
            SELECT
                c.id,
                c.fir_number,
                c.status,
                c.latitude,
                c.longitude,
                c.occurrence_date,
                d.district_name,
                ch.crime_name
            FROM case_master c
            LEFT JOIN districts  d  ON c.district_id    = d.id
            LEFT JOIN crime_heads ch ON c.crime_head_id = ch.id
            ${where}
            ORDER BY c.occurrence_date DESC
        `, params);

        return result.rows;
    }
}

module.exports = new MapRepository();
