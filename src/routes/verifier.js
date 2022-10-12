const { Router } = require('express');
const models = require('../models');

const router = new Router();

router.post('/', (req, res) => {
  const getverifier = async (email, code) => {
    try {
      const data = await models.verifier(email, code);
      res.send(data).status(200);
    } catch (error){
      console.error(error);
    }
  };
  getverifier(req.body.email, req.body.code);
});

module.exports = router;
