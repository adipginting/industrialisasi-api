const { Pool } = require('pg');
const pool = new Pool();

const login = async (username) => {
  try {
    const hashed_password = await pool.query('SELECT hashed_password FROM login_informations WHERE username=$1', [username]);
    return hashed_password.rows[0]['hashed_password']
  } catch(err){
    console.log(err);
  }
};

module.exports = login;

