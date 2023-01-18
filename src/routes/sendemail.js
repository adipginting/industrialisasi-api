const router = require("express").Router();
const models = require("../models");
const emailvalidator = require("email-validator");

router.post("/", (req, res) => {
  const email = req.body.email;

  if (emailvalidator(email) === false) {
    res.send("Email invalid").status(403);
  }

  models.email(email).then((does_email_exist) => {
    if (does_email_exist) {
      res.send("Email has already been registered.").status(403);
    } else {
      models.sendemail(email);
      res.send(true).status(200);
    }
  });
});

module.exports = router;
