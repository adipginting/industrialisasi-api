const router = require("express").Router();
const models = require("../models");
const passwordStrength = require("check-password-strength");

router.post("/", (req, res) => {
  const code = req.body.code;
  const username = req.body.username;
  const password = req.body.password;
  let email = '';

  if (passwordStrength(password).length < 6) {
    res
      .send("Password is too short. Password must be more than six characters")
      .status(403);
  } else if (passwordStrength(password).id < 0) {
    res
      .send(
        "Password is too weak. Use special characters and alphanumeric combinations"
      )
      .status(403);
  } else {
    let is_register_info_valid = true;
    models.verifier(code).then(email_db => {
      if (email_db){
        email = email_db;
      }
      else {
        is_register_info_valid = false;
      }
    });

    models.username(username).then(does_username_exist => {
      if (does_username_exist === true){
        is_register_info_valid = false;
      }
    });

    if (is_register_info_valid === true){
      models.register(username, email, password);
      res.sendStatus(200);
    }
  }
});

module.exports = router;
