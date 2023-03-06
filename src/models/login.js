const { Pool } = require('pg');
const pool = new Pool();

const login = async (username) => {
  try {
    const hashed_password = await pool.query('SELECT HashedPassword FROM Users WHERE Username=$1', [username]);
    return hashed_password.rows[0]['hashedpassword']
  } catch(err){
    console.error(err);
  }
};

module.exports = login;

