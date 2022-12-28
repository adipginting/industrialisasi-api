const { Pool } = require('pg');
const pool = new Pool();
const argon2 = require('argon2');

const authorization = async (token) => {
  try {
    hashed_token = argon2.hash(token, {type: argon2.argon2i});
    const result = await pool.query('SELECT EXISTS(SELECT 1 FROM refresh_tokens WHERE hashed_token = $1 )', [hashed_token]);
    console.log(result.rows[0].exists);
    return result.rows[0].exists;
  } catch(error){
    console.error(error);
  }
};

module.exports = authorization;
