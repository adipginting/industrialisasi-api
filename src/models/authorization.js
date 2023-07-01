const { Pool } = require("pg");
const pool = new Pool();

const authorization = async (refresh_token) => {
  try {
    const result = await pool.query(
      "SELECT EXISTS(SELECT 1 FROM RefreshTokens WHERE RefreshToken = $1 )",
      [refresh_token]
    );
    return result.rows[0].exists;
  } catch (error) {
    console.error(error);
  }
};

module.exports = authorization;
