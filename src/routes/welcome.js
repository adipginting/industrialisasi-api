const { Router } = require("express");
const models = require("../models");
const router = Router();

router.get("/", (req, res) => {
  const session_token = req.cookies["session-token"];
  const get_username_using_token_from_db = async () => {
    const username = await models.session_token_username(session_token);
    if (username !== "") {
      res
        .send({
          message: "Welcome to industrialisasi. You are an authenticated user",
          username: username,
        })
        .status(200);
    } else {
      res
        .send({
          message: "Welcome to Industrialisasi. You are not logged in.",
          username: "",
        })
        .status(403);
    }
  };

  if (typeof session_token !== "undefined" && session_token !== "") {
    get_username_using_token_from_db(session_token);
  } else {
    res
      .send({
        message: "Welcome to Industrialisasi. You are not logged in.",
        username: "",
      })
      .status(403);
  }
});

module.exports = router;
