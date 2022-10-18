const router = require("express").Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.get("/", (req, res) => {
  const header = req.headers.authorization;
  if (header === 'undefined') {
    res.send("no");
  } else if (header === 'no token') {
    res.send("no");
  } else if (header === 'loggedout') {
    res.send("no");
  } else {
    const bearertoken = header;
    const tokenarr = bearertoken.split(" ");
    const token = tokenarr[1];
    const { username } = jwt.verify(token, process.env.secret_key);
    res.send(username);
  }
});

module.exports = router;
