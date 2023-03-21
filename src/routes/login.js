const router = require('express').Router();
const models = require('../models');
const argon2 = require('argon2');
const uuid = require('uuid');
require('dotenv').config();

router.post('/', (req, res) => {
  const session_cookie = async (username) => {
    try {
      const token = uuid.v4();
      const date = new Date();
      date.setMinutes(date.getMinutes() + 30);
      res.cookie("session-cookie", token, { expires: date, httpOnly: true, secure: true, sameSite: "none" });
      res.end();
      await models.session(username, token);
    } catch (err) {
      console.error(err);
    }
  };

  const does_login_info_match = async (username, password) => {
    try {
      const hashed_password = await models.login(username);
      if (await argon2.verify(hashed_password, password)) {
        session_cookie(username);
      } else {
        res.sendStatus(403);
      }
    } catch (err) {
      console.error(err);
    }
  };

  does_login_info_match(req.body.username, req.body.password);
});

module.exports = router;
