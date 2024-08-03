/*
  Reference: I have used CHATGPT, Github Copilot  and my own knowledge to code the following file.
*/

const express = require('express');
const jwt = require('jsonwebtoken');
const automaticallyLoginCheck = require('../Middleware/automaticallyLoginCheck');
const { SECRET_KEY } = require('../Middleware/seceretKey');
const xss = require('xss');

const router = express.Router();
const { getSession } = require('../neo4j');

// The following variable is the expiration time of the token.
const EXPIRATION_TIME = 60*60*24; // 24 hours

router.post('/api/signin', automaticallyLoginCheck, async function (req, res) {
  console.log('username: '+req.userId)
  console.log('Server received: POST /api/signin');

  if (req.userId) {
    // This means that the user has been already logged in.
    console.log('User passed automaticallyLoginCheck: ', req.userId);
    res.status(200).json({ signinCorrect: true, uid: req.userId });
    return;
  }
  
  // The following code will sanatize the user's input to avoid xss attack.
  const email = xss(req.body.email);
  console.log('email: '+email);
  const password = xss(req.body.password);
  console.log('password: '+password);

  const session = getSession();
  let query = `MATCH (u:User) WHERE u.email = $email AND u.password = $password RETURN u`;
  let params = { email: email, password: password };
  
  try {
    let result = await session.run(query, params);
    console.log(result.records);
    if (result.records.length > 0) {
      let user = result.records[0].get('u').properties;
      let uid = user.uid;
      console.log('uid: '+uid);

      // This means that a user provided the valid information to login into the system.
      // We should provide the token to the user.
      // Let the infomration inside the token to be the username of the user by setting the id to the username.
      const token = jwt.sign({ id: uid }, SECRET_KEY, {
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
      res.status(200).json({ signinCorrect: true, uid: uid });
    } else {
      // This means that the user provided the invalid information to login into the system; we should let frontend know that the user has been failed to login.
      res.status(401).json({ signinCorrect: false });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ signinCorrect: false });
  } finally {
    session.close();
  }
});

router.post('/api/logout', (req, res) => {
    console.log('Server received: POST /api/logout');

    // Since user wants to logout, we should clear the cookie.
    res.clearCookie('auth', { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    res.status(200).json({ logoutStatus: true });

});

module.exports = router;
