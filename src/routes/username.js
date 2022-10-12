const router = require('express').Router();
const models = require('../models');

router.post('/', (req, res) => {
  const getusername = async (username) => {
    const data = await models.username(username);
    res.status(200).send(data);
  };
  getusername(req.body.username);

});

module.exports = router;
