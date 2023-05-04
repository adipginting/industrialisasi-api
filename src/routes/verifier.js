const { Router } = require("express");
const models = require("../models");

const router = new Router();

router.post("/", (req, res) => {
  const getverifier = async (code) => {
    try {
      const data = await models.verifier(code);
      if (typeof data != "undefined") res.send(data).status(200);
      else res.sendStatus(403);
    } catch (error) {
      console.error(error);
    }
  };
  getverifier(req.body.code);
});

module.exports = router;
