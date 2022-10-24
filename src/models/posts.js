const Pool = require('pg').Pool;
const pool = new Pool();

const posts = async (no_posts) => {
  try {
    data = await pool.query('SELECT username, post, posted_at, last_edited_at FROM posts ORDER BY posted_at DESC LIMIT $1', [no_posts]);
    return data;
  } catch(err){
    console.error(err);
  }
};

module.exports = posts;
