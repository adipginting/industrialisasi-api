const router = require('express').Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

router.get('/', (req, res) => {
  console.log('Headers ' + req.headers.authorization);
  const header = req.headers.authorization;
  if (typeof(header) !== "undefined" || header !== ''){
    const bearertoken = header;
    console.log(header);
    const tokenarr = bearertoken.split(' ');
    const token = tokenarr[1];
    const { username } = jwt.verify(token, process.env.secret_key);
    res.send(username);
  }
});

module.exports = router;
