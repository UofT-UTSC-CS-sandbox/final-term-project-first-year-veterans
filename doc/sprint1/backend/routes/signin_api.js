const express = require('express');
const jwt = require('jsonwebtoken');
const automaticallyLoginCheck = require('../Middleware/automaticallyLoginCheck');
const { SECRET_KEY } = require('../Middleware/seceretKey');
const xss = require('xss');

const router = express.Router();

const DB = [
  { email: 'email', password: 'password', username: 'username1' },
  { email: 'email2', password: 'password2', username: 'username2' },
];

router.post('/api/signin', automaticallyLoginCheck, async function (req, res) {
  console.log('Server received: POST /api/signin');
  console.log(req.body);
  console.log(req.cookies);
  console.log(req.cookies.auth)

  const email = xss(req.body.email);
  const password = xss(req.body.password);
  console.log(email);
    console.log(password);
  
  // Find user in the mock database
  const user = DB.find(u => u.email === email && u.password === password);

  if (user) {
    // Generate token
    const token = jwt.sign({ id: user.username }, SECRET_KEY, {
      expiresIn: 86400, // 24 hours
    });

    // Set cookie
    res.cookie('auth', token, { 
        maxAge: 60 * 60 * 1000, 
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
    
    });
    res.status(200).json({ signinCorrect: true });
  } else {
    res.status(401).json({ signinCorrect: false });
  }
});

router.post('/api/logout', (req, res) => {
    res.clearCookie('auth', { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    res.status(200).json({ logoutStatus: true });

});

module.exports = router;
