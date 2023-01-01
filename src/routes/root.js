const { Router } = require('express');
//check whether there is a username in res.locals.username
// check whethere there is a access token in res.locals.access_token
// check whether there is a refresh_token in res.locals.refresh_token

const router = Router();
router.get('/', (req, res) => {
  if (res.locals.access_token){
    res.cookie('refresh_token', res.locals.refresh_token, {secure: true, httpOnly: true});
    res.send({'username':res.locals.username, 'access_token':res.locals.access_token}).status(200);
  } else if(res.locals.username){
    res.send({'username': res.locals.username}).status(200);
  } else {
    res.send("Welcome to Industrialisasi. You haven't logged in.").status(200);
  }
});

module.exports = router;


