const { Pool } = require("pg");
const pool = new Pool();

const session = async (username, token) => {
  try {
    await pool.query(
      "INSERT INTO Sessions(Username, SessionToken) VALUES($1, $2)",
      [username, token]
    );
  } catch (err) {
    console.error(err);
  }
};

module.exports = session;
