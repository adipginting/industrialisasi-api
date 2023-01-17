const router = require('express').Router();
const models = require('../models');

router.post('/', (req, res) => {
  const email = req.body.email;

  models.email(email).then(does_email_exist => {
    if (does_email_exist === false){
      models.sendemail(req.body.email);
      res.send(true).status(200);
    } else {
      res.send('Email has already been registered.').status(403);
    }
  });
});

module.exports = router;
