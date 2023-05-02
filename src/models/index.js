const register = require("./register");
const email = require("./email");
const username = require("./username");
const registered_email = require("./registered_email");
const verifier = require("./verifier");
const login = require("./login");
const posts = require("./posts");
const post = require("./post");
const session = require("./session");
const session_token_username = require("./session_token_username");

module.exports = {
  register,
  email,
  username,
  registered_email,
  verifier,
  login,
  posts,
  post,
  session,
  session_token_username,
};
