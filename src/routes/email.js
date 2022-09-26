const router = require('express').Router();
const models = require('../models');

router.post('/', (req, res) => {
  const getemail = async (_email_) => {
    const data = await models.email(_email_);
    res.status(200).send(data);
  };
  getemail(req.body.email);

});

module.exports = router;
