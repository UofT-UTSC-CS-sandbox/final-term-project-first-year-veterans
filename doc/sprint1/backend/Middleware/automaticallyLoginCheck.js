const { verify } = require('jsonwebtoken');
const { SECRET_KEY } = require('./seceretKey');

const automaticallyLoginCheck = (req, res, next) => {
  const token = req.cookies.auth;

  if (token) {
    verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).send('Failed to authenticate token');
      }
      req.userId = decoded.id;
      return res.status(200).json({ signinCorrect: true, redirect: true });
    });
  } else {
    next();
  }
};

module.exports = automaticallyLoginCheck;
