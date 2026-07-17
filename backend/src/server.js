require("dotenv").config();

const app = require("./app");
const pool = require("./config/db");

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    // Test PostgreSQL connection
    await pool.query("SELECT NOW();");

    console.log("✅ PostgreSQL Connected Successfully");

    app.listen(PORT, () => {
      console.log(`🚀 Backend Server Running on Port ${PORT}`);
    });

  } catch (error) {
    console.error("❌ Failed to connect to PostgreSQL");
    console.error(error.message);
    process.exit(1);
  }
}

startServer();