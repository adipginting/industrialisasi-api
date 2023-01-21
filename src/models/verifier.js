const { Pool } = require('pg');
const pool = new Pool();

const verifier = async (code) => {
  try{
    const {rows:[{email}]} = await pool.query(`SELECT email FROM email_verification_codes WHERE code=$1 AND (saved_at  > now() - INTERVAL '5 MINUTES')`, [code]);
    if (email){
      return email;
    }
  } catch(error){
    console.error(error);
  }
};

module.exports = verifier;
