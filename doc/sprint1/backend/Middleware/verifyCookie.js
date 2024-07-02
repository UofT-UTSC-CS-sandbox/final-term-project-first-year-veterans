/*
  Reference: I have used CHATGPT, Github Copilot  and my own knowledge to code the following file.
*/
const { verify } = require('jsonwebtoken');
const { SECRET_KEY } = require('./seceretKey');
const { TokenExpiredError } = require('jsonwebtoken');


const generalErrorMsg = "Failed to authenticate token"


const verifyToken = (req, res, next) => {
  /*

    Description:
    
      - This function will be used when the user has been login and with token is not expired.
        If the token has been expired, we should logout the user and let the user login again.

    How to use:

      - Frontend Developer: Should always check if the status code is 302 and redirectToLogin is true. 
                            If it is true, then redirect the user to the login page using navigation hook.
                      
      - Backend Developer:  Use this middleware in the routes where you want to check if the user is authenticated or not.
                            For example, in the calendar_api.js, I have used this middleware to check if the user is authenticated or not to get the events
                            by calling this function inside router. i.e:router.get('/api/events',verifyToken , function(req, res) {some code here});
                        
                            Warning: If the exist token is not exist or expired or any other error, the remaining code inside the router will not be executed.

  */

  const token = req.cookies.auth;   // This code will provide the authentication token from the cookie
  
  
  if (!token) {

    // This means that token never existed; which is strange because the user should have been authenticated before accessing this route.
    return res.status(302).json({ redirectToLogin: true , msgErr: "You should have been authenticated before accessing this route, but you don't have a token ?!" });
  
  }

  verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {

      // Since the error is invalid token, we should logout the user and let the user login again. We should also clear the cookie.

      res.clearCookie('auth', { httpOnly: true, secure: process.env.NODE_ENV === 'production' }); 
      return res.status(302).json({ redirectToLogin: true , msgErr: generalErrorMsg });      
      
    }else{
      req.userId = decoded.id;
      next();
    }
  });
};

module.exports = verifyToken;
