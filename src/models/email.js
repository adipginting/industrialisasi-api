const { Pool } = require('pg');
const pool = new Pool();

const check_email_on_db = async (email) => {
  const db_email = '';
  try{
    await pool.query('SELECT EXISTS (SELECT * FROM login_informations WHERE email=$1', [email])
      .then(res => {db_email = res.rows[0]['email']}, err => {return (err)});
    console.log(db_email);
    return db_email;
  } catch(error) {
    return error;
  }
};

const email = (email) => {
  let email_on_db;
  check_email_on_db(email).then(result => {email_on_db = result}, error => {console.error(error)});
  return email_on_db;
};

module.exports = email;
