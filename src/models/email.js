const { Pool } = require('pg');
const pool = new Pool();

const email = async (email) => {
  try{
    const db_email = await pool.query('SELECT EXISTS (SELECT * FROM login_informations WHERE email=$1)', [email]);
    return db_email.rows[0]['exists'];
  } catch(error) {
      throw error;
  } finally{
    pool.end();
  }
};

module.exports = email;
