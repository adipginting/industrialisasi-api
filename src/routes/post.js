const router = require("express").Router();
const models = require("../models");

router.post("/", (req, res) => {
  const post_post = async () => {
    try {
      const username = await models.session_token_username(
        req.cookies["session-token"]
      );
      if (username === "" || username === undefined) {
        res.sendStatus(403);
      } else {
        await models.post(username, req.body.title, req.body.content);
        res.sendStatus(200);
      }
    } catch (error) {
      console.error(error);
    }
  };

  post_post();
});

module.exports = router;
