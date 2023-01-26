const router = require("express").Router();
const models = require("../models");
const validator = require("validator");
const { passwordStrength } = require("check-password-strength");

router.post("/", (req, res) => {
  const code = req.body.code;
  const username = req.body.username;
  const password = req.body.password;

  if (username.length < 3){
    res.send("Username must be at least three characters").status(403);
  } else if (validator.isAlphanumeric(username)){
    res.send("Username must consist of alphabets and numbers.").status(403);
  }
  if (password.length < 6) {
    res
      .send("Password is too short. Password must be more than six characters")
      .status(403);
  } else if (passwordStrength(password).id < 1) {
    res
      .send(
        "Password is too weak. Use special characters and alphanumeric combinations"
      )
      .status(403);
  } else {
    let is_register_info_valid = true;

    const save_registration = async () => {
      const email = await models.verifier(code);
      if (!!email === false){
          is_register_info_valid = false;
        }

      const does_username_exist = await models.username(username);

      if (does_username_exist === true){
          is_register_info_valid = false;
          res.send('Username has already existed').status(403);
        }

      if (is_register_info_valid === true){
        models.register(username, email, password);
        res.status(200);
      }
    }
    save_registration(); //call async function here
  }
});

module.exports = router;
