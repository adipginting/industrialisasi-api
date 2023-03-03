const router = require("express").Router();
const jwt = require("jsonwebtoken");
const models = require("../models");
require("dotenv").config();

router.use('/', (req, res, next) => {
  const username_in_access_token = () => {
    let username = "";
    if (typeof req.headers.authorization !== "undefined") {
      const access_token = req.headers.authorization.split(" ")[1];
      try{
        username = jwt.verify(access_token, process.env.secret_key);
      } catch (err) {
        if (err){
          console.error(err);
          username = "";
        }
      }
    }
    return username;
  };

  if (username_in_access_token() !== ""){
    res.locals.get_username();
    next();
  }

  const get_refresh_token = () => {
    if (typeof req.cookies !== "undefined") {
      const cookie_arr = Object.keys(req.cookies);
      for (let i = 0; i < cookie_arr.length; i++) {
        if (cookie_arr[i].includes("Bearer")) {
          return cookie_arr[i];
        }
      }
    }
    return "";
  };

  const is_refresh_token_valid = async () => {
    let is_it_valid = false;
    try{
      if (get_refresh_token() !== "") {
        is_it_valid = await models.authorization(get_refresh_token());
      }
    } catch(err){
      if (err){
        console.error(err);
        is_it_valid = false;
      }
    }
    if (is_it_valid === false)
      console.log("Line 53 of authorization.js on route. refresh_token does not exist");
    return is_it_valid;
  };

  const username_in_refresh_token = async () => {
    let username = "";
    const refresh_token = get_refresh_token().split(' ')[1];
    if (await is_refresh_token_valid() === true) {
      try{
        username = jwt.verify(refresh_token, process.env.secret_key);
      } catch(err){
        if (err){
          console.error(err);
          username = "";
        }
      }
    }
    return username;
  };

  const generate_jwt = async () => {
      try{
        if (await username_in_refresh_token() !== "") {
          res.locals.access_token = "Bearer " + jwt.sign({ username: res.locals.username }, process.env.secret_key, { expiresIn: "30m" });
          res.locals.refresh_token = "Bearer " + jwt.sign({ username: res.locals.username }, process.env.secret_key, {expiresIn: "7d" });
          console.log(res.locals.access_token);
          console.log(res.locals.refresh_token);
          models.refresh_token(get_refresh_token());
        }
      } catch (err) {
        console.error(err);
      }
  };

  generate_jwt();
  next();
});

module.exports = router;
