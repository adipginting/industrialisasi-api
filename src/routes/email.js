const router = require('express').Router();
const models = require('../models');

router.get('/', (req, res) => {
  const data = models.email(req.body.email);
  console.log(data);
});

module.exports = router;
