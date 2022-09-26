const { Pool } = require('pg');
const pool = new Pool();

const verifier = async (_email_, _code_) => {
  try{
    const data = await pool.query(`SELECT EXISTS(SELECT * FROM email_verification_codes WHERE email=$1 AND code=$2 AND (saved_at  > now() - INTERVAL '3 MINUTES'))`, [_email_, _code_]);
    console.log( 'Verifier code is valid for ' + _email_ + " " + data.rows[0]['exists']);
    return data.rows[0]['exists'];
  } catch(error){
    console.error(error);
  }
};

module.exports = verifier;
