const register = require("./register");
const email = require("./email");
const username = require("./username");
const registered_email = require("./registered_email");
const verifier = require("./verifier");
const login = require("./login");
const posts = require("./posts");
const post = require("./post");
const welcome = require("./welcome");

module.exports = {
  register,
  email,
  username,
  registered_email,
  verifier,
  login,
  posts,
  post,
  welcome,
};
