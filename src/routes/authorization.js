const router = require("express").Router();
const jwt = require("jsonwebtoken");
const models = require("../models");
require("dotenv").config();

router.use('/', (req, res, next) => {
  console.log("Test");
  next();
});

module.exports = router;
