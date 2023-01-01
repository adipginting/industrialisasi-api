const { Pool } = require("pg");
const argon2 = require("argon2");

const pool = new Pool();

const register = (username, email, password) => {
  const storelogininformations = async () => {
    try {
      const hash = await argon2.hash(password, {
        type: argon2.argon2i,
      });
      await pool.query("INSERT INTO login_informations VALUES ($1, $2, $3)", [
        username,
        email,
        hash,
      ]);
    } catch (error) {
      console.error(error);
    }
  };
  storelogininformations();
};

module.exports = register;
