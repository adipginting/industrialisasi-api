const router = require("express").Router();
const jwt = require("jsonwebtoken");
const models = require("../models");
require("dotenv").config();

router.use('/', (req, res, next) => {
  console.log(req.cookies);
  const username_in_access_token = () => {
    let username = "";
    if (typeof req.headers.authorization !== "undefined") {
      const access_token = req.headers.authorization.split(" ")[1];
      try{
        const result = jwt.verify(access_token, process.env.secret_key);
        username = result.username;
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
    res.locals.username = username_in_access_token();
    next();
  }

  const get_refresh_token = () => {
    if (typeof req.cookies !== "undefined") {
      const refresh_token_arr = Object.keys(req.cookies);
      //console.log('Refresh token authorization', refresh_token_arr[0]);
      return refresh_token_arr[0];
    }
    return "";
  };

  const is_refresh_token_in_db = async () => {
    try{
      if (get_refresh_token() !== "") {
        return await models.authorization(get_refresh_token());
      }
    } catch(err){
      if (err){
        console.error(err);
      }
    }
    return true;
  };

  const set_username_to_res_local_username_from_refresh_token = async () => {
    let token = "";
    console.log("Tetap semangant", get_refresh_token());
    if (get_refresh_token() !== ""){
      token = get_refresh_token().split(' ')[1];
    }
    if (await is_refresh_token_in_db() === false) {
      try{
        const result = jwt.verify(token, process.env.secret_key);
        res.locals.username = result.username;
      } catch(err){
        if (err){
          console.error(err);
        }
      }
    }
  };

  const generate_jwt = () => {
    try{
      if (res.locals.username !== "" && typeof res.locals.username !== 'undefined') {
        res.locals.access_token = jwt.sign({ username: res.locals.username }, process.env.secret_key, { expiresIn: "30m" });
        res.locals.refresh_token = jwt.sign({ username: res.locals.username }, process.env.secret_key, {expiresIn: "7d" });
        models.refresh_token(get_refresh_token());
      }
    } catch (err) {
      console.error(err);
    }
  };

  set_username_to_res_local_username_from_refresh_token();
  generate_jwt();
  next();
});

module.exports = router;
