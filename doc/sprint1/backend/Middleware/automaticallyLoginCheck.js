const { verify, TokenExpiredError } = require('jsonwebtoken');
const { SECRET_KEY } = require('./seceretKey');

const automaticallyLoginCheck = (req, res, next) => {
  const token = req.cookies.auth;

  if (token) {
    verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        if (err instanceof TokenExpiredError) {
          console.log("Token expired");
          next(); // Token expired, proceed to the next middleware or route handler
        } else {
          return res.status(401).send('Failed to authenticate token'); // Other error, send 401 and stop
        }
      } else {
        req.userId = decoded.id; // No error, set userId
        next(); // Proceed to the next middleware or route handler
      }
    });
  } else {
    next(); // No token, proceed to the next middleware or route handler
  }
};

module.exports = automaticallyLoginCheck;
