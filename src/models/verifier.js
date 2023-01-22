const { Pool } = require('pg');
const pool = new Pool();

const verifier = async (code) => {
  try{
    const {rows:[{email}]} = await pool.query(`SELECT Email FROM Codes WHERE Code=$1 AND (SavedAt  > now() - INTERVAL '5 MINUTES')`, [code]);
    if (email){
      return email;
    }
  } catch(error){
    console.error(error);
  }
};

module.exports = verifier;
