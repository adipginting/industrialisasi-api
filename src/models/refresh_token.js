const { Pool } = require("pg");
const pool = new Pool();

const refresh_token = async (refresh_token) => {
  try {
    await pool.query(
      "INSERT INTO RefreshTokens(RefreshToken, AddedAt) VALUES ($1, now())",
      [refresh_token]
    );
  } catch (error) {
    console.error(error);
  }
};

module.exports = refresh_token;
