const { Pool } = require('pg');
const pool = new Pool();
const argon2 = require('argon2');

const refresh_token = async (token) => {
  try {
    const hashed_token = argon2.hash(token, {type: argon2.argon2i});
    await pool.query('INSERT INTO HashedRefreshTokens(HashedRefreshToken, AddedAt) VALUES ($1, now())', [hashed_token]);
  } catch (error){
    console.error(error);
  }
};

module.exports = refresh_token;
