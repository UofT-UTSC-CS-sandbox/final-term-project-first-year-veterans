/*
  Reference: I have used CHATGPT, Github Copilot  and my own knowledge to code the following file.
*/

const { verify, TokenExpiredError } = require('jsonwebtoken');
const { SECRET_KEY } = require('./seceretKey');

const automaticallyLoginCheck = (req, res, next) => {

  const token = req.cookies.authenticationToken;     // This code will provide the authentication token from the cookie

  /* 
      If there exist a token, then we can verify whether it is a valid token or not.
      If the token has been expired, we should not treate it as invalid token and return, we should let 
      /signin GET request handle it by authenticate user again.
  */

  if (token) {

    // If there is a token, we can verify it.
    verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        // We should ignore the token expire error, the /signin GET request will deal with it.
        if (err instanceof TokenExpiredError) {
        
          console.log("Token expired");
          next(); // Token expired, proceed to the next middleware or route handler
      
        } else {

          return res.status(401).send('Failed to authenticate token'); // Other error, send 401 and stop
       
        }
      } else {
        
        // If there is no error, this means that the user token is vaild. We can set the decode result as the user id by doing the following.
        req.userId = decoded.id; 
        next(); // Execute next middleware or route handler if there exist.
      
      }
    });
  } else {

    // If token is not presenting, this means the user could be firstime login.

    next(); // Execute next middleware or route handler if there exist.

  }
};

module.exports = automaticallyLoginCheck;
