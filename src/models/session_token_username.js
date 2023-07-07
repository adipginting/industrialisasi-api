const { Pool } = require("pg");
const pool = new Pool();

const session_token_username = async (session_token) => {
  try {
    const result = await pool.query(
      "SELECT Username FROM Sessions WHERE sessionToken=$1",
      [session_token]
    );
    if (result.rows[0] === undefined) {
      return "";
    } else {
      return result.rows[0].username;
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = session_token_username;
