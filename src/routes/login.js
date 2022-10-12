const router = require('express').Router();
const { login } = require('../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();

router.post('/', (req, res) => {
  const does_login_info_exist = async (username, hashed_password) => {
    try{
      const is_data_on_db = await login(username, hashed_password);
      console.log(hashed_password);
      if (is_data_on_db == true){
        const user = {'username':username, 'hashed_password':hashed_password};
        jwt.sign(user, process.env.secret_key, {expiresIn: '7d'}, (err, token) => {
          if (err){
            res.sendStatus(403);
          } else {
            res.send(token).status(202);
          }
        });
      } else {
        res.sendStatus(403);
      }
    } catch(err){
      res.sendStatus(403);
    }
  };

  does_login_info_exist(req.body.username, req.body.hashed_password);
});

module.exports = router;
