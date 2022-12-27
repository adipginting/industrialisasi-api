const { Pool } = require('pg');
const pool = new Pool();
const argon2 = require('argon2');

const authorization = async (token) => {
  try {
    hashed_token = argon2.hash(token, {type: argon2.argon2i});
    const result = pool.query('SELECT EXISTS(SELECT 1 FROM invalid_refresh_tokens WHERE refresh_token = $1 )', [hashed_token]);
    return result.rows[0].exists;
  } catch(error){
    console.error(error);
  }
};

module.exports = authorization;
