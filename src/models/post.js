const { Pool } = require('pg');
const pool = new Pool();

const post = async (username, title, content) => {
  try{
    await pool.query("INSERT INTO Posts(Title, Post, PostedAt, Username, PostID) VALUES ($1, $2, now(), $3, $4)", [title, content, username, Math.random() * 1000]);
  } catch(error){
    console.error(error);
  }
};

module.exports = post;
