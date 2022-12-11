const router = require('express').Router();
const { login } = require('../models');
const jwt = require('jsonwebtoken');
const argon2 = require('argon2');
require('dotenv').config();

router.post('/', (req, res) => {
  const does_login_info_match = async (username, password) => {
    const user = {'username':username};
    const jwt_token_generation = (expiry_time, isCookie) => {
      jwt.sign(user, process.env.secret_key, {expiresIn: expiry_time}, (err, token) => {
        if (err){
          res.sendStatus(500);
        } else {
          if(isCookie)
            res.cookie('Bearer ' + token, {secure: true, httpOnly: true});
          else
            res.send('Bearer ' + token).status(200);
        }
      });
    }

    try{
      const hashed_password = await login(username);
      if (await argon2.verify(hashed_password, password)){
        jwt_token_generation('7d', true); //refresh token
        jwt_token_generation('30m', false); //access token

      } else {
        res.sendStatus(403);
      }
    } catch(err){
      res.sendStatus(403);
    }
  };

  does_login_info_match(req.body.username, req.body.password);
});

module.exports = router;
