const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./routes');
require('dotenv').config();

app.use(express.urlencoded({"extended":"true"}));
app.use(express.json());
app.use(cors({"origin":"http://localhost:3000"}));
//app.use(cors());
app.use('/register', routes.register);
app.use('/email', routes.email);
app.use('/username', routes.username);
app.use('/sendemail', routes.sendemail);
app.use('/verifier', routes.verifier);
app.use('/login', routes.login);
app.use('/jwtvalidation', routes.jwtvalidation);

module.exports = app;
