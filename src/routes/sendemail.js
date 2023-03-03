const router = require("express").Router();
const models = require("../models");
const validator = require("validator");

router.post("/", (req, res) => {
  const email = req.body.email;

  if (validator.isEmail(email) === false) {
    res.send("Email invalid").status(403);
  }

  models.email(email).then((does_email_exist) => {
    if (does_email_exist) {
      res.send("Email has already been registered.").status(403);
    } else {
      models.sendemail(email);
      res.send(`An email has been sent to ${email}`).status(200);
    }
  });
});

module.exports = router;
