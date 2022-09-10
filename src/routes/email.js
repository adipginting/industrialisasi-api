const router = require('express').Router();
const models = require('../models');

router.get('/', (req, res) => {
  const get_email = async (email) => {
    const data = await models.email(email);
    console.log(data);
    res.send(data);
  };

  get_email(req.body.email);

});

module.exports = router;
