const { Pool } = require("pg");
const pool = new Pool();

const email = async (email) => {
  try {
    const db_email = await pool.query(
      "SELECT EXISTS (SELECT 1 FROM Users WHERE Email=$1)",
      [email]
    );
    return db_email.rows[0]["exists"];
  } catch (error) {
    console.error(error);
  }
};

module.exports = email;
