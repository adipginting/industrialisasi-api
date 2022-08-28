const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

app.use(express.urlencoded({"extended":"true"}));
app.use(cors({"origin":"http://localhost:3000"}));

module.exports = app;
