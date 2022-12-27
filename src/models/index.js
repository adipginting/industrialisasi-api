const register = require("./register");
const email = require("./email");
const username = require("./username");
const sendemail = require("./sendemail");
const verifier = require("./verifier");
const login = require("./login");
const posts = require("./posts");
const post = require("./post");
const authorization = require("./authorization");
const refresh_token = require('./refresh_token');

module.exports = {
  register,
  email,
  username,
  sendemail,
  verifier,
  login,
  posts,
  post,
  authorization,
  refresh_token
};
