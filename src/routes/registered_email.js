const router = require("express").Router();
const models = require("../models");
const validator = require("validator");

router.post("/", (req, res) => {
  const email = req.body.email;

  if (validator.isEmail(email) === false) {
    res.send("Access denied. The email is invalid").status(403);
  }

  models.email(email).then((does_email_exist) => {
    if (does_email_exist) {
      res.send("Access denied. The email had been registered.").status(403);
    } else {
      models.sendemail(email);
      res.send("OK. An email has been sent.").status(200);
    }
  });
});

module.exports = router;
