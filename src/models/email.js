const { Pool } = require('pg');
const pool = new Pool();

const email = async (email) => {
  try{
    const db_email = await pool.query('SELECT * FROM login_informations WHERE email=$1', [email]);
    console.log(db_email.rows[0]['email']);
    return db_email.rows[0]['email'];
  } catch(error) {
    throw error;
  }
};

/**const email = (email) => {
  var db_email = '';
  check_email_on_db(email).then(result => {db_email = result});
  return db_email;
};**/

module.exports = email;
