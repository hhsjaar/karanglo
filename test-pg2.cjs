const { Pool } = require('pg');
const pool = new Pool({
  connectionString: 'postgresql://postgres.cjrreyjthzqzuwypcbcc:Temonanjing123@aws-1-ap-northeast-1.pooler.supabase.com:6543/postgres'
});
pool.query('SELECT 1').then(console.log).catch(console.error).finally(() => pool.end());
