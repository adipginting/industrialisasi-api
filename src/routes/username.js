const router = require('express').Router();
const models = require('../models');

router.post('/', (req, res) => {
  const getusername = async (_username_) => {
    const data = await models.username(_username_);
    res.status(200).send(data);
  };
  getusername(req.body.username);

});

module.exports = router;
