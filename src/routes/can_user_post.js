const router = require("express").Router();
const models = require("../models");

router.get("/", (req, res) => {
  const can_user_post_async = async () => {
    const username = await models.session_token_username(
      req.cookies["session-token"],
    );
    if (username !== "" || username !== undefined) {
      const can_user_post_boolean = await models.can_user_post(username);
      res.status(200).send({ can_user_post: can_user_post_boolean });
    } else {
      res.status(200).send({ can_user_post: false });
    }
  };
  can_user_post_async();
});

module.exports = router;
