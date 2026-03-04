const { Pool } = require('pg');
require('dotenv').config();

async function test() {
    const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL.replace(/\?pgbouncer=true(&connection_limit=\d+)?/, "");
    const pool = new Pool({ 
        connectionString,
        ssl: { rejectUnauthorized: false }
    });

    console.log("Attempting query...");
    try {
        const res = await pool.query('SELECT 1 as connected');
        console.log("Success:", res.rows);
    } catch (err) {
        console.error("Error:", err.message);
    } finally {
        await pool.end();
    }
}

test();
