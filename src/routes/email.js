const router = require('express').Router();
const models = require('../models');

router.post('/', (req, res) => {
  const getemail = async (email) => {
    const data = await models.email(email);
    res.status(200).send(data);
  };
  getemail(req.body.email);

});

module.exports = router;
