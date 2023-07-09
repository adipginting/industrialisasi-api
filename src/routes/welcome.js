const { Router } = require("express");
const models = require("../models");
const router = Router();

router.get("/", (req, res) => {
  const get_username_using_token_from_db = async () => {
    const username = await models.session_token_username(
      req.cookies["session-token"],
    );

    if (username === "" || username === undefined) {
      res
        .send({
          message: "Welcome to Industrialisasi. You are not logged in.",
          username: "",
        })
        .status(200);
    } else {
      res
        .send({
          message: "Welcome to industrialisasi. You are an authenticated user",
          username: username,
        })
        .status(403);
    }
  };

  get_username_using_token_from_db();
});

module.exports = router;
