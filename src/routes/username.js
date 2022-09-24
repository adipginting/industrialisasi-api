const router = require('express').Router();
const models = require('../models');

router.post('/', (req, res) => {
  const get_email = async (username) => {
    const data = await models.username(username);
    res.status(200).send(data);
  };
  get_email(req.body.username);

});

module.exports = router;
