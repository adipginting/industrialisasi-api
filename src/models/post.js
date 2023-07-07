const { Pool } = require("pg");
const uuid = require("uuid");
const pool = new Pool();

const post = async (username, title, content) => {
  try {
    const post_id = uuid.v4();
    await pool.query(
      "INSERT INTO Posts(Title, Content, PostedAt, Username, PostID) VALUES ($1, $2, now(), $3, $4)",
      [title, content, username, post_id]
    );
  } catch (error) {
    console.error(error);
  }
};

module.exports = post;
