const { Pool } = require("pg");
const pool = new Pool();

const session = async (username, token) => {
  try {
    console.log("From models/session line 6", token);
    await pool.query(
      "INSERT INTO Sessions(Username, SessionToken) VALUES($1, $2)",
      [username, token]
    );
  } catch (err) {
    console.error(err);
  }
};

module.exports = session;
