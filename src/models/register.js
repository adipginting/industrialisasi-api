const { Pool } = require("pg");
const argon2 = require("argon2");

const pool = new Pool();

const register = (username, email, password) => {
  const store_users = async () => {
    try {
      const hash = await argon2.hash(password, {
        type: argon2.argon2i,
      });
      await pool.query("INSERT INTO Users VALUES ($1, $2, $3)", [
        username,
        email,
        hash,
      ]);
    } catch (error) {
      console.error(error);
    }
  };
  store_users();
};

module.exports = register;
