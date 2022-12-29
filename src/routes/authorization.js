const router = require("express").Router();
const jwt = require("jsonwebtoken");
const models = require("../models");
require("dotenv").config();

router.use('/', (req, res, next) => {
  let access_token = ""; //these blocks test if access code exists or is valid
  let is_access_token_valid = false;
  console.log("It's here");
  if (req.headers.authorization) {
    access_token = req.headers.authorization.split(" ")[1];
    jwt.verify(access_token, process.env.secret_key, (err, result) => {
      if (err) {
        console.error(err);
      } else {
        res.locals.username = result.username;
        next();
      }
    });
  }

  let refresh_token = ""; //these blocks test if refresh code exist or is valid
  let is_refresh_token_valid = false;
  if (req.cookies) {
    const cookie_arr = Object.keys(req.cookies);
    for (let i = 0; i < cookie_arr.length; i++) {
      if (cookie_arr[i].includes("Bearer")) {
        refresh_token = cookie_arr[i];
      }
    }
  }

  if (!!refresh_token === true) {
    is_refresh_token_valid = true;
  }

  models.authorization(refresh_token).then((does_token_exist) => {
    if (does_token_exist === false) {
      is_refresh_token_valid = true;
    }
  });

  if (is_refresh_token_valid === true) {
    jwt.verify(refresh_token, process.env.secret_key, (err, result) => {
      if (err) {
        is_refresh_token_valid = false;
      } else {
        res.locals.username = result.username; //this is to be used later in the next condition to generate a new access token
      }
    });
  }

  if (is_access_token_valid === false && is_refresh_token_valid === true) {
    //generate new access and refresh token. Saving old refresh token to db
    jwt.sign(
      { username: res.locals.username },
      process.env.secret_key,
      { expiresIn: "30m" },
      (err, token) => {
        if (err) {
          console.error(err);
        } else {
          res.locals.access_token = "Bearer " + token;
        }
      }
    );

    jwt.sign(
      { username: res.locals.username },
      process.env.secret_key,
      { expiresIn: "7d" },
      (err, token) => {
        if (err) {
          console.error(err);
        } else {
          res.locals.refresh_token = "Bearer " + token;
        }
      }
    );
    models.refresh_token(refresh_token);
    next();
  }
  next();
});

module.exports = router;
