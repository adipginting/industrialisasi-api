const register = require("./register");
const email = require("./email");
const username = require("./username");
const email_to_be_registered = require("./email_to_be_registered");
const verifier = require("./verifier");
const login = require("./login");
const posts = require("./posts");
const post = require("./post");
const welcome = require("./welcome");
const logout = require("./logout");

module.exports = {
  register,
  email,
  username,
  email_to_be_registered,
  verifier,
  login,
  posts,
  post,
  welcome,
  logout,
};
