const { Router } = require('express');
const models = require('../models');

const router = new Router();

router.post('/', (req, res) => {
  const getverifier = async (_email_, _code_) => {
    try {
      const data = await models.verifier(_email_, _code_);
      res.send(data).status(200);
    } catch (error){
      console.error(error);
    }
  };
  getverifier(req.body.email, req.body.code);
});

module.exports = router;
