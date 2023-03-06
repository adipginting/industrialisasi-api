const router = require('express').Router();
const { login } = require('../models');
const jwt = require('jsonwebtoken');
const argon2 = require('argon2');
require('dotenv').config();

router.post('/', (req, res) => {
  const jwt_token_generation = (username, expiry_time, isCookie) => {
    const user = {'username':username};
    const token = jwt.sign(user, process.env.secret_key, {expiresIn: expiry_time});
    try{

      if(isCookie){
        res.cookie('Bearer ' + token, {sameSite: 'none', secure: true, httpOnly: true});
      } else
        res.send('Bearer ' + token).status(200);
    } catch(err) {
      console.error(err);
    }
  };

  const does_login_info_match = async (username, password) => {
    try{
      const hashed_password = await login(username);
      if (await argon2.verify(hashed_password, password)){
        jwt_token_generation(username, '7d', true); //refresh token
        jwt_token_generation(username, '30m', false); //access token
      } else {
        res.sendStatus(403);
      }
    } catch(err){
      console.error(err);
    }
  };

  does_login_info_match(req.body.username, req.body.password);
});

module.exports = router;
