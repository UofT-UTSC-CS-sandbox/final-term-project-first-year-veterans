const { verify, TokenExpiredError } = require('jsonwebtoken');
const { SECRET_KEY } = require('./seceretKey');

const automaticallyLoginCheck = (req, res, next) => {
  const token = req.cookies.authenticationToken;

  if (token) {
    console.log("Token exists:", token);
    verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        if (err instanceof TokenExpiredError) {
          console.log("Token expired");
          next();
        } else {
          console.log("Failed to authenticate token:", err.message);
          return res.status(401).send('Failed to authenticate token');
        }
      } else {
        console.log("Token is valid:", decoded);
        req.userId = decoded.id;
        next();
      }
    });
  } else {
    console.log("No token found");
    next();
  }
};

module.exports = automaticallyLoginCheck;