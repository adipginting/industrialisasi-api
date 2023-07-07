const { Pool } = require("pg");
const uuid = require("uuid");
const pool = new Pool();

const session = async (username, token) => {
  try {
    const session_id = uuid.v4();
    await pool.query(
      "INSERT INTO Sessions(Username, SessionToken, SessionID) VALUES($1, $2, $3)",
      [username, token, session_id]
    );
  } catch (err) {
    console.error(err);
  }
};

module.exports = session;
