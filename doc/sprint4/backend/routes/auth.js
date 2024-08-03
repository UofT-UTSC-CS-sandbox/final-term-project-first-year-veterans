const express = require('express');
const automaticallyLoginCheck = require('../Middleware/automaticallyLoginCheck');

const router = express.Router();

router.get('/api/auth', automaticallyLoginCheck, async function (req, res) {
    console.log('Server received: GET /api/auth');
    console.log('in auth.js, req.userId: ', req.userId);
    if (req.userId) {
        console.log('User passed verifyToken: ', req.userId);
        res.status(200).json({ redirectToLogin: false, uid: req.userId });
    }
    else {
        console.log('User did not pass verifyToken');
        res.status(500).json({ redirectToLogin: true });
    }
});

module.exports = router;