const { Pool } = require('pg');
const pool = new Pool();

const post = async (username, title, content) => {
  try{
    await pool.query("INSERT INTO posts(title, post, posted_at, username, post_id) VALUES ($1, $2, now(), $3, $4)", [title, content, username, Math.random() * 100]);
  } catch(error){
    console.error(error);
  }
};

module.exports = post;
