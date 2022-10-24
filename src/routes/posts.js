const router = require('express').Router();
const { posts } = require('../models');

router.post('/', (req, res) => {
  const get_posts = async () => {
    try {
      const posts_ = await posts(req.body.no_posts);
      res.send(posts_).status(200);
    } catch(err){
      console.error(err);
    }
  };

  get_posts();
});
module.exports = router;
