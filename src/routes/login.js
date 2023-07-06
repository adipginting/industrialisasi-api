const router = require("express").Router();
const models = require("../models");
const argon2 = require("argon2");
const uuid = require("uuid");
require("dotenv").config();

router.post("/", (req, res) => {
  const session_cookie = async (username) => {
    try {
      const token = uuid.v4();
      const date = new Date();
      date.setMinutes(date.getMinutes() + 30);
      res.cookie("session-token", token, {
        expires: date,
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });
      await models.session(username, token);
    } catch (err) {
      console.error(err);
    }
  };

  const does_login_info_match = async (username, password) => {
    try {
      if (
        username === undefined ||
        password === undefined ||
        username === "" ||
        password === ""
      ) {
        res.status(200).send(false);
      } else {
        const is_username_registered = await models.username(username);
        let hashed_password = "";
        if (is_username_registered === true) {
          hashed_password = await models.login(username);
        }

        if (hashed_password === "") {
          res.status(200).send(false);
        } else if (await argon2.verify(hashed_password, password)) {
          await session_cookie(username);
          res.status(200).send(true);
        } else {
          res.status(200).send(false);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  does_login_info_match(req.body.username, req.body.password);
});

module.exports = router;
