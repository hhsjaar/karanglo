import { Pool } from 'pg';
import 'dotenv/config';

async function test() {
    console.log("Testing connection...");
    const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL?.replace(/\?pgbouncer=true(&connection_limit=\d+)?/, "");
    console.log("Using URL:", connectionString?.split('@')[1]); // Hide credentials

    const pool = new Pool({ 
        connectionString,
        ssl: connectionString?.includes("supabase.com") ? { rejectUnauthorized: false } : false
    });

    try {
        const res = await pool.query('SELECT 1 as connected');
        console.log("Result:", res.rows);
        console.log("✅ Connection Successful!");
    } catch (err) {
        console.error("❌ Connection Failed:", err);
    } finally {
        await pool.end();
    }
}

test();
