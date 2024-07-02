const { verify } = require('jsonwebtoken');
const { SECRET_KEY } = require('./seceretKey');

const verifyToken = (req, res, next) => {
  const token = req.cookies.auth;

  if (!token) {
    return res.status(403).send('No token provided');
  }

  verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(500).send('Failed to authenticate token');
    }

    req.userId = decoded.id;
    next();
  });
};

module.exports = verifyToken;
