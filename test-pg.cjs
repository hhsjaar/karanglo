const { Pool } = require('pg');
require('dotenv').config();

const connectionString = process.env.DATABASE_URL.replace(/\?pgbouncer=true(&connection_limit=\d+)?/, "");
console.log("connectionString:", connectionString);

const pool = new Pool({ connectionString });

pool.query('SELECT 1 as result', (err, res) => {
  if (err) {
    console.error("Error connecting with pg:", err);
  } else {
    console.log("Success with pg:", res.rows);
  }
  pool.end();
});
