const Pool = require('pg').Pool;
const pool = new Pool();

const posts = async (no_posts) => {
  try {
    data = await pool.query('SELECT Title, Post, Username, PostId, PostedAt, LastEditedAt FROM Posts ORDER BY PostedAt DESC LIMIT $1', [no_posts]);
    return data;
  } catch(err){
    console.error(err);
  }
};

module.exports = posts;
