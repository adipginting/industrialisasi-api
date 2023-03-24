const register = require("./register");
const email = require("./email");
const username = require("./username");
const sendemail = require("./sendemail");
const verifier = require("./verifier");
const login = require("./login");
const posts = require("./posts");
const post = require("./post");
const session = require('./session');
const session_token_username = require('./session_token_username');

module.exports = {
  register,
  email,
  username,
  sendemail,
  verifier,
  login,
  posts,
  post,
  session,
  session_token_username
};
