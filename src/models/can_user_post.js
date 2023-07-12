const { Pool } = require("pg");
const pool = new Pool();

const can_user_post = async (username) => {
  const result = await pool.query(
    "SELECT CanPost FROM Users WHERE Username=$1",
    [username],
  );

  if (result.rows.length > 0) {
    return result.rows[0].canpost;
  }
  return false;
};

module.exports = can_user_post;
