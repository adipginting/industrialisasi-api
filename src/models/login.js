const { Pool } = require('pg');
const pool = new Pool();

const login = async (username) => {
  try {
    const hashed_password = await pool.query('SELECT HashedPassword FROM Users WHERE Username=$1', [username]);
    console.log(hashed_password, "Line 7 of models.login.js");
    return hashed_password.rows[0]['hashedpassword']
  } catch(err){
    console.log(err);
  }
};

module.exports = login;

