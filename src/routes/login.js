const router = require('express').Router();
const { login } = require('../models');
const jwt = require('jsonwebtoken');
const argon2 = require('argon2');
require('dotenv').config();

router.post('/', (req, res) => {
  const does_login_info_match = async (username, password) => {
    try{
      const hashed_password = await login(username);
      console.log(hashed_password);
      console.log( "JWT token generation works? " + await argon2.verify(hashed_password, password));

      if (await argon2.verify(hashed_password, password)){
        const user = {'username':username};
        jwt.sign(user, process.env.secret_key, {expiresIn: '7d'}, (err, token) => {
          if (err){
            res.sendStatus(403);
          } else {
            console.log(token);
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

  does_login_info_match(req.body.username, req.body.password);
});

module.exports = router;
