const { Pool } = require('pg');
const argon2 = require('argon2');

const pool = new Pool();


const register = (_username_, _email_, _password_) => {
  const storelogininformations = async () => {
    try{
      const hash = await argon2.hash(_password_, {
        type: argon2.argon2i,
      });
      await pool.query('INSERT INTO login_informations VALUES ($1, $2, $3)', [_username_, _email_, hash]);
      console.log('User ' + _username_ +' using email ' + _email_ + ' is registered successfully!');
    } catch(error){
      console.error(error);
    }
  };
  console.trace();
  storelogininformations();
};

module.exports = register;
