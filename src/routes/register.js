const router = require("express").Router();
const models = require("../models");
const validator = require("validator");
const { passwordStrength } = require("check-password-strength");

router.post("/", (req, res) => {
  const code = req.body.code;
  const username = req.body.username;
  const password = req.body.password;

  const save_registration = async () => {
    const get_email = async () => {
      const email = await models.verifier(code);
      return email;
    };

    const is_username_valid = async () => {
      const does_username_exist = await models.username(username);
      return does_username_exist;
    };

    if (typeof (await get_email()) === "undefined") {
      res.send("Code is not valid.").status(403);
    } else if (is_username_valid() === true) {
      res.send("Username has already existed").status(403);
    } else {
      models.register(username, await get_email(), password);
      res.send("Registration is successful.").status(200);
    }
  };

  if (username.length < 3) {
    res.send("Username must be at least three characters").status(403);
  } else if (validator.isAlphanumeric(username) === false) {
    res.send("Username must consist of alphabets and numbers.").status(403);
  }
  if (password.length <= 6) {
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
    save_registration();
  }
});

module.exports = router;
