const router = require("express").Router();
const models = require("../models");

router.post("/", (req, res) => {
  const clear_cookie = async () => {
    const session_token = req.cookies["session-token"];
    await models.logout(session_token);
    res.cookie("session-token", "", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    res.status(200).send("Logout is sucessful");
  };

  clear_cookie();
});

module.exports = router;
