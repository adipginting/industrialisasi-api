const { Pool } = require("pg");
const pool = new Pool();

const logout = async (session_token) => {
  try {
    await pool.query("DELETE FROM Sessions WHERE sessiontoken=$1", [
      session_token,
    ]);
  } catch (err) {
    console.err(err);
  }
};

module.exports = logout;
