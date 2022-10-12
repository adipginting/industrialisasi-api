const { Pool } = require('pg');
const pool = new Pool();

const login = async (username, hashed_password) => {
  try {
    const does_exist = await pool.query('SELECT EXISTS (SELECT * FROM login_informations WHERE username=$1 and hashed_password=$2)', [username, hashed_password]);
    if (does_exist.rows[0]['exists']){
      return true;
    }
  } catch(err){
    console.log(err);
    return false;
  }
};

module.exports = login;

