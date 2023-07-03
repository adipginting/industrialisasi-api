const nodemailer = require("nodemailer");
const randomstring = require("randomstring");
const { Pool } = require("pg");
const pool = new Pool();
require("dotenv").config();

const email_to_be_registered = (email) => {
  const inserttodb = async (email, code) => {
    try {
      await pool.query("INSERT INTO Codes VALUES($1, $2, now())", [
        email,
        code,
      ]);
    } catch (e) {
      console.error(e);
    }
  };

  const code = randomstring.generate(6);

  const connection = {
    service: "gmail",
    auth: {
      user: process.env.gmail_user,
      pass: process.env.gmail_pass,
    },
  };

  const message = {
    from: process.env.gmail_user + "@gmail.com",
    to: email,
    subject: "Your email verification code for industrialisasi is: " + code,
    text:
      "Thank you for your interest in industrialisasi. This is your verification code. \n" +
      code +
      "\nThis code will be valid for five minutes. \nSincerely, \nyour friend at the development of industrialisasi.",
    html:
      "<p> Thank you for your interest in industrialisasi. This is your verification code. </p> <p>" +
      code +
      "</p><p> This code will be valid for five minutes.</p><p> Sincerely,</p> <p> your friend at the development of industrialisasi.</p>",
  };

  const sender = nodemailer.createTransport(connection);
  sender.sendMail(message);
  sender.verify((error, success) => {
    if (error) {
      console.error(error);
    } else {
      console.log("A verification email was sent to " + email + " " + success);
    }
  });
  inserttodb(email, code);
};

module.exports = email_to_be_registered;
