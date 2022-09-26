const router = require('express').Router();
const models = require('../models');

router.post('/', (req, res) => {
  models.sendemail(req.body.email);
  res.send(true).status(200);
});

module.exports = router;
