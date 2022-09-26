const nodemailer = require('nodemailer');
const randomstring = require('randomstring');
const { Pool } = require('pg');
const pool = new Pool();
require('dotenv').config();

const inserttodb = async (_email_, _code_) => {
  try{
    await pool.query('INSERT INTO email_verification_codes VALUES($1, $2, now())', [_email_, _code_]);
  } catch(e) {
    console.error(e);
  }
};

const sendemail = (_email_) => {
  const _code_ = randomstring.generate(6);

  const connection = {
    service: 'gmail',
    auth : {
      user: process.env.gmail_user,
      pass: process.env.gmail_pass
    }
  };

  const message = {
    from: 'adi.industrialisasi@gmail.com',
    to: _email_,
    subject: 'Your email verification code for industrialisasi is: ' + _code_ + '.',
    text: 'Thank you for your interest in industrialisasi. Your email verification code is: ' + _code_ + '. \n\nSincerely, \nyour friend at the development of industrialisasi.',
    html: '<p> Thank you for your interest in industrialisasi. Your email verification code is: ' + _code_ + '.</p> <p> Sincerely,</p> <p> your friend at the development of industrialisasi.</p>'
  };

  const sender = nodemailer.createTransport(connection);
  sender.sendMail(message);
  sender.verify((error, success) => {
    if(error){
      console.error(error);
    }
    else {
      console.log("A verification email was sent to " + _email_);
    }
  });
  inserttodb(_email_, _code_);
};

module.exports = sendemail;
