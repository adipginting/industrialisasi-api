const { Pool } = require('pg');
const pool = new Pool();

const email = async (email) => {
  try{
    const db_email = await pool.query('SELECT EXISTS (SELECT 1 FROM login_informations WHERE email=$1)', [email]);
    return db_email;
  } catch(error) {
      throw error;
  }
};

module.exports = email;
