const { Pool } = require('pg');
const pool = new Pool();

const username = async (username) => {
  try{
    const db_username = await pool.query('SELECT EXISTS (SELECT * FROM login_informations WHERE username=$1)', [username]);
    return db_username.rows[0]['exists'];
  } catch(error) {
      throw error;
  }
};

module.exports = username;
