const express = require('express');
const router = express.Router();
const { checkAuth } = require('../helper_functions/auth');

// set cookie
router.get('/api/cookie',function(req, res){ 
	res.cookie('cookie_name', 'cookie_value', { maxAge: 60 * 1000, httpOnly: true, secure: true });
	return res.send('cookie has been set!');
});

// check cookie
router.get('/api/check-auth', function (req, res) {
    if (checkAuth(req)) {
        res.status(200).json({ loggedIn: true });
    } else {
        res.status(401).json({ loggedIn: false });
    }
});

// delete cookie
router.get('/api/deletecookie', function(req,res){
	res.clearCookie('cookie_name');
	res.send('Cookie deleted');
});

module.exports = router;