/*
  Reference: I have used CHATGPT, Github Copilot  and my own knowledge to code the following file.
*/

const express = require('express');
const jwt = require('jsonwebtoken');
const automaticallyLoginCheck = require('../Middleware/automaticallyLoginCheck');
const { SECRET_KEY } = require('../Middleware/seceretKey');
const xss = require('xss');

const router = express.Router();

// The following is temporay database.
const DB = [
  { email: 'email', password: 'password', username: 'username1' },
  { email: 'email2', password: 'password2', username: 'username2' },
];

// The following variable is the expiration time of the token.
const EXPIRATION_TIME = 60 * 60 * 24; // 24 hours

router.post('/api/signin', automaticallyLoginCheck, async function (req, res) {
  
  console.log('Server received: POST /api/signin');

  // The following code will sanatize the user's input to avoid xss attack.
  const email = xss(req.body.email);
  const password = xss(req.body.password);

  
  // Find user in the temporay database
  const user = DB.find(u => u.email === email && u.password === password);

  if (user) {

    // This means that a user provided the valid information to login into the system.
    // We should provide the token to the user.
    // Let the infomration inside the token to be the username of the user by setting the id to the username.
    const token = jwt.sign({ id: user.username }, SECRET_KEY, {
      
      expiresIn: EXPIRATION_TIME

    });

    // Set cookie
    res.cookie('authenticationToken', token, { 
        maxAge: EXPIRATION_TIME * 1000,   // Let the cookie to be expire after 24 hours. We multuply 1000 to convert seconds to milliseconds because maxAge is in milliseconds.  
        httpOnly: true,   // Form GPT: "prevent XSS attacks by indicating the cookie should be accessible only through the HTTP protocol"
        secure: process.env.NODE_ENV === 'production',  // From GPT:  "the cookie should be transmitted only over HTTPS."
        sameSite: 'strict'  // From GPT: "ensures that the cookie is sent only with same-site requests, adding a layer of protection against cross-site request forgery (CSRF) attacks."
    
    });

    // Send the response to the frontend to indicate that the user has been successfully logged in.
    res.status(200).json({ signinCorrect: true });

  } else {

    // This means that the user provided the invalid information to login into the system; we should let frontend know that the user has been failed to login.
    res.status(401).json({ signinCorrect: false });

  }
});

router.post('/api/logout', (req, res) => {

    // Since user wants to logout, we should clear the cookie.
    res.clearCookie('auth', { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    res.status(200).json({ logoutStatus: true });

});

module.exports = router;
