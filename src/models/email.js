const { Pool } = require('pg');
const pool = new Pool();

const does_email_exist = async (email) => {
  try{
    const { data:status } = await pool.query('SELECT * FROM login_informations WHERE email=$1)', [email]);
    return status;
  } catch(error) {
    console.log(error);
  }
};

const email = (email) => {
  let email_on_db = '';
  does_email_exist(email).then(status => {email_on_db = status});
  return email_on_db;
};

module.exports = email;
