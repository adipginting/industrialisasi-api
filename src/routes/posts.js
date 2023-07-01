const router = require("express").Router();
const { posts } = require("../models");

router.post("/", (req, res) => {
  const get_posts = async () => {
    try {
      const _posts = await posts(req.body.no_posts);
      res.send(_posts).status(200);
    } catch (err) {
      console.error(err);
    }
  };

  get_posts();
});
module.exports = router;
