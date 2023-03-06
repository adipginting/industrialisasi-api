const { Router } = require('express');
//check whether there is a username in res.locals.username
// check whethere there is a access token in res.locals.access_token
// check whether there is a refresh_token in res.locals.refresh_token

const router = Router();
router.get('/', (req, res) => {
  if (typeof res.locals.access_token !== 'undefined' && typeof res.locals.username !== 'undefined'){
  //  res.cookie('Bearer' + res.locals.refresh_token, {sameSite: "none", secure: true, httpOnly: true});
    res.send({'username':res.locals.username, access_token: 'Bearer '+ res.locals.access_token}).status(200);
  } else if(typeof res.locals.username !== 'undefined'){
    res.send({'username': res.locals.username}).status(200);
  } else {
    res.json({'message': 'Welcome to Industrialisasi. You are not logged in.', 'username':''}).status(403);
  }
});

module.exports = router;
