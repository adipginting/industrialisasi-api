const { Pool } = require('pg');
const pool = new Pool();

const verifier = async (email, code) => {
  try{
    const data = await pool.query(`SELECT EXISTS(SELECT * FROM email_verification_codes WHERE email=$1 AND code=$2 AND (saved_at  > now() - INTERVAL '3 MINUTES'))`, [email, code]);
    console.log( 'Verifier code is valid for ' + email + " " + data.rows[0]['exists']);
    return data.rows[0]['exists'];
  } catch(error){
    console.error(error);
  }
};

module.exports = verifier;
