const Pool = require('pg').Pool;
const argon2 = require('argon2');

const pool = Pool();

const register = (
  async (username, email, password) => {
    const hash = await argon2(password, {
      type: argon2i,
    });

    const result = await pool.query('INSERT INTO login_informations VALUES ($username, $email, $hash', [username, email, hash]);
    console.log(result);
  })();

module.exports = register;
