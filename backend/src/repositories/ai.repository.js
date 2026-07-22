const db = require('../config/db');

class AIRepository {
    async getMonthlyCrimeCounts() {
        const query = `
            SELECT 
                TO_CHAR(occurrence_date, 'YYYY-MM') AS month_year, 
                COUNT(id) AS total_crimes
            FROM case_master
            GROUP BY TO_CHAR(occurrence_date, 'YYYY-MM')
            ORDER BY month_year ASC
        `;
        const result = await db.query(query);
        return result.rows;
    }

    async getDistrictRiskData() {
        // Fetch district stats: total crimes, active cases, violent crimes, repeat offenders
        // Violent crimes broadly assumed from category names.
        const query = `
            WITH RepeatOffenders AS (
                SELECT a.accused_name, c.district_id
                FROM accused a
                JOIN case_master c ON a.case_id = c.id
                GROUP BY a.accused_name, c.district_id
                HAVING COUNT(DISTINCT c.id) > 1
            ),
            DistrictRepeatCounts AS (
                SELECT district_id, COUNT(accused_name) as repeat_offender_count
                FROM RepeatOffenders
                GROUP BY district_id
            )
            SELECT 
                d.id as district_id,
                d.district_name,
                COUNT(c.id) AS total_crimes,
                COUNT(CASE WHEN c.status != 'Closed' THEN 1 END) AS active_cases,
                COUNT(CASE WHEN ch.crime_name ILIKE '%murder%' 
                             OR ch.crime_name ILIKE '%assault%' 
                             OR ch.crime_name ILIKE '%rape%' 
                             OR ch.crime_name ILIKE '%robbery%'
                             OR ch.crime_name ILIKE '%dacoity%' 
                             OR ch.crime_name ILIKE '%kidnap%' THEN 1 END) AS violent_crimes,
                COALESCE(MAX(drc.repeat_offender_count), 0) AS repeat_offender_count
            FROM districts d
            LEFT JOIN case_master c ON d.id = c.district_id
            LEFT JOIN crime_heads ch ON c.crime_head_id = ch.id
            LEFT JOIN DistrictRepeatCounts drc ON d.id = drc.district_id
            GROUP BY d.id, d.district_name
            ORDER BY total_crimes DESC
        `;
        const result = await db.query(query);
        return result.rows;
    }

    async getRepeatOffenders() {
        const query = `
            SELECT 
                a.accused_name as name, 
                COUNT(DISTINCT c.id) as connected_cases,
                ARRAY_AGG(DISTINCT d.district_name) as districts,
                ARRAY_AGG(DISTINCT ch.crime_name) as crime_categories
            FROM accused a
            JOIN case_master c ON a.case_id = c.id
            LEFT JOIN districts d ON c.district_id = d.id
            LEFT JOIN crime_heads ch ON c.crime_head_id = ch.id
            GROUP BY a.accused_name
            HAVING COUNT(DISTINCT c.id) > 1
            ORDER BY connected_cases DESC
        `;
        const result = await db.query(query);
        return result.rows;
    }

    async getCrimeCategoryStats() {
        const query = `
            SELECT 
                ch.crime_name,
                COUNT(c.id) as count
            FROM case_master c
            JOIN crime_heads ch ON c.crime_head_id = ch.id
            GROUP BY ch.crime_name
            ORDER BY count DESC
        `;
        const result = await db.query(query);
        return result.rows;
    }

    async getSummaryStats() {
        const query = `
            SELECT 
                (SELECT COUNT(*) FROM case_master) as total_crimes,
                (SELECT COUNT(*) FROM case_master WHERE status != 'Closed') as active_cases,
                (SELECT COUNT(*) FROM districts) as total_districts
        `;
        const result = await db.query(query);
        return result.rows[0];
    }
}

module.exports = new AIRepository();
