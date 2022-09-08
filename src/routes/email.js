const router = require('express').Router();
const models = require('../models');

router.get('/', (req, res) => {
  console.log(req.body.email);
  const status = models.email(req.body.email);
  res.json({"status":status}).sendStatus(200);
});

module.exports = router;
