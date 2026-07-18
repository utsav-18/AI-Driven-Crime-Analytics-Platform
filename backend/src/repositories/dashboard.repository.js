const db = require('../config/db');

class DashboardRepository {
    async getTotalCrimes() {
        const result = await db.query("SELECT COUNT(*) AS total FROM case_master");
        return result.rows[0];
    }

    async getCrimesByDistrict() {
        const result = await db.query(`
            SELECT d.district_name, COUNT(c.id) AS total_crimes
            FROM districts d
            LEFT JOIN case_master c ON d.id = c.district_id
            GROUP BY d.id, d.district_name
        `);
        return result.rows;
    }

    async getCrimeCategories() {
        const result = await db.query(`
            SELECT ch.crime_name, COUNT(c.id) AS total_crimes
            FROM crime_heads ch
            LEFT JOIN case_master c ON ch.id = c.crime_head_id
            GROUP BY ch.id, ch.crime_name
        `);
        return result.rows;
    }

    async getMonthlyTrend() {
        const result = await db.query(`
            SELECT TO_CHAR(occurrence_date, 'YYYY-MM') AS month, COUNT(id) AS total_crimes
            FROM case_master
            GROUP BY TO_CHAR(occurrence_date, 'YYYY-MM')
            ORDER BY month ASC
        `);
        return result.rows;
    }

    async getYearlyTrend() {
        const result = await db.query(`
            SELECT EXTRACT(YEAR FROM occurrence_date) AS year, COUNT(id) AS total_crimes
            FROM case_master
            GROUP BY EXTRACT(YEAR FROM occurrence_date)
            ORDER BY year ASC
        `);
        return result.rows;
    }

    async getRecentCases() {
        const result = await db.query(`
            SELECT id, fir_number, occurrence_date, status
            FROM case_master
            ORDER BY occurrence_date DESC
            LIMIT 10
        `);
        return result.rows;
    }

    async getCaseStatusDistribution() {
        const result = await db.query(`
            SELECT status, COUNT(id) AS total_cases
            FROM case_master
            GROUP BY status
        `);
        return result.rows;
    }
}

module.exports = new DashboardRepository();
