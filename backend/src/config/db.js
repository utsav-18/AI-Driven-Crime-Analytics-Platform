const { Pool } = require("pg");
const logger = require("../utils/logger");

const pool = new Pool({
    user: process.env.POSTGRES_USER || "postgres",
    password: process.env.POSTGRES_PASSWORD || "postgres",
    host: process.env.POSTGRES_HOST || "postgres",
    port: process.env.POSTGRES_PORT || 5432,
    database: process.env.POSTGRES_DB || "crime_db",
});

pool.on("error", (err) => {
    logger.error("Unexpected error on idle client", err);
    process.exit(-1);
});

module.exports = {
    query: (text, params) => pool.query(text, params),
    getClient: () => pool.connect(),
    pool
};