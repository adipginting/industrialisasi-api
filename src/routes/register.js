const router = require('express').Router();
const models = require('models');

router.post('/', (req, res) => {
  models.register(req.body.username, req.body.email, req.body.password);
  res.send(200);
});
