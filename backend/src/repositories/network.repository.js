const db = require('../config/db');

class NetworkRepository {
    async getGraphData() {
        // Fetch cases with their district and crime category
        const casesQuery = `
            SELECT 
                c.id as case_id, 
                c.fir_number, 
                c.status,
                d.district_name,
                ch.crime_name
            FROM case_master c
            LEFT JOIN districts d ON c.district_id = d.id
            LEFT JOIN crime_heads ch ON c.crime_head_id = ch.id
        `;
        const cases = await db.query(casesQuery);

        // Fetch all accused
        const accusedQuery = `
            SELECT 
                a.id as accused_id, 
                a.case_id, 
                a.accused_name, 
                a.status
            FROM accused a
        `;
        const accused = await db.query(accusedQuery);

        // Fetch all victims
        const victimsQuery = `
            SELECT 
                v.id as victim_id, 
                v.case_id, 
                v.victim_name,
                v.injury_type
            FROM victims v
        `;
        const victims = await db.query(victimsQuery);

        // Fetch all complainants
        const complainantsQuery = `
            SELECT 
                cp.id as complainant_id, 
                cp.case_id, 
                cp.complainant_name
            FROM complainants cp
        `;
        const complainants = await db.query(complainantsQuery);

        return {
            cases: cases.rows,
            accused: accused.rows,
            victims: victims.rows,
            complainants: complainants.rows
        };
    }
}

module.exports = new NetworkRepository();
