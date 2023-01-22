1. /
  a. This end point will return the string of "Welcome to Industrialisasi. You haven't logged in." and the HTTP status 200 when user has not logged in. Usage:
  curl -X GET -H "Content-Type:application/json" http://industrialisasi.site/
  b. This end point will return the string of the name of the logged-in user and the HTTP status of 200 when the user has been logged in and has a valid access token.
  c. This end point will return the string of the name of the logged-in user, a string of the access token, a string of the refresh token to HTTP Only Cookie, and the HTTP status of 200.


2. /sendemail
  This end point is the first to be used in a registration sequence. It will send an email containing a string of verification code that will be valid for five minutes to your email inbox. Usage:
  curl -X POST -H "Content-Type:application/json" -d '{"email":"someone@example.com"}' http://industrialisasi.site/sendemail

3. /register
  This end point is used to register all of the required register data: username, password, and the verification string. Usage:
  curl -X POST -H "Content-Type: application/json" -d '{"code": "c0d3", "username":"example", "password":"p4455wOrd"}' http://industrialisasi.site/register
