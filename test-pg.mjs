import { Pool } from 'pg';
import { readFileSync } from 'fs';
import * as dotenv from 'dotenv';

const env = dotenv.parse(readFileSync('.env'));
const url = env.DATABASE_URL.replace(/\?pgbouncer=true(&connection_limit=\d+)?/, "");
console.log("URL:", url);

const pool = new Pool({ connectionString: url });

pool.query('SELECT 1 as result', (err, res) => {
  if (err) {
    console.error("Error connecting with pg:", err);
  } else {
    console.log("Success with pg:", res.rows);
  }
  pool.end();
});
