const router = require('express').Router();
const models = require('../models');

router.post('/', (req, res) => {
  const get_email = async (email) => {
    const data = await models.email(email);
    res.status(200).send(data.rows[0]['exists']);
  };
  get_email(req.body.email);

});

module.exports = router;
