const register = require('./register');
const email = require('./email');
const username = require('./username');
const sendemail = require('./sendemail');
const verifier = require('./verifier');
const login = require('./login');
const jwtvalidation = require('./jwtvalidation');
const posts = require('./posts');
const post = require('./post');
const authorization = require('./authorization');
const root = require('./root');

module.exports = { register, email, username, sendemail, verifier, login, jwtvalidation, posts, post, authorization, root };
