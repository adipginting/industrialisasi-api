const express = require("express");
const cors = require("cors");
const app = express();
const routes = require("./routes");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
require("dotenv").config();
app.use(express.urlencoded({ extended: "true" }));
app.use(express.json());
//app.use(cors({"origin":"http://localhost:3000"}));
app.use(cors());

const access_authorization = (req, res, next) => {
  let access_token = "";
  let is_access_token_valid = false;
  if (req.headers.authorization) {
    access_token = req.headers.authorization.split(" ")[1];
    jwt.verify(access_token, process.env.secret_key, (err, result) => {
      if (err) {
        is_access_token_valid = false;
      } else {
        res.locals.username = result.username;
        is_refresh_token_valid = true;
        next();
      }
    });
  }

  let refresh_token = "";
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
    jwt.verify(refresh_token, process.env.secret_key, (err, result) => {
      if (err) {
        is_refresh_token_valid = false;
      } else {
        res.locals.username = result.username;
        is_refresh_token_valid = true;
      }
    });
  }

  if(is_access_token_valid === false && is_refresh_token_valid === true){
    jwt.sign({'username':res.locals.username}, process.env.secret_key, {expiresIn: '30m'}, (err, token) => {
      if (err){
        console.error(err);
        res.sendStatus(500);
      } else {
        res.locals.access_token = "Bearer " + token;
        next;
      }
    });

    jwt.sign({'username':res.locals.username}, process.env.secret_key, {expiresIn: '7d'}, (err, token) => {
      if(err){
        console.error(err);
        res.sendStatus(500);
      } else {
        res.locals.refresh_token = "Bearer " + token;
      }
    });
  }
};

app.use("/register", routes.register);
app.use("/email", routes.email);
app.use("/username", routes.username);
app.use("/sendemail", routes.sendemail);
app.use("/verifier", routes.verifier);
app.use("/login", routes.login);
app.use("/posts", routes.posts);
app.use("/post", routes.post);

module.exports = app;
