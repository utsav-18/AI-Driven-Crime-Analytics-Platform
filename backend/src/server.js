require("dotenv").config();
const app = require("./app");
const db = require("./config/db");
const logger = require("./utils/logger");

const PORT = process.env.PORT || 5000;

async function startServer() {
    try {
        // Test PostgreSQL connection
        await db.query("SELECT NOW();");
        logger.info("✅ PostgreSQL Connected Successfully");

        app.listen(PORT, () => {
            logger.info(`🚀 Backend Server Running on Port ${PORT}`);
        });
    } catch (error) {
        logger.error("❌ Failed to connect to PostgreSQL", error);
        process.exit(1);
    }
}

startServer();