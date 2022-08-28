const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./routes');
require('dotenv').config();

app.use(express.urlencoded({"extended":"true"}));
app.use(cors({"origin":"http://localhost:3000"}));
app.use('/register', routes.register);

module.exports = app;
