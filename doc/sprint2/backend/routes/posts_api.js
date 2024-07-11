const express = require('express');
const router = express.Router();

let DB = [
    { userId: "Richie_Hsieh", postTitle: "Introduction 1", postMessage: "My name is Richie! This is my first post" },
    { userId: "Andy", postTitle: "Introduction 2", postMessage: "My name is Andy! This is my first post" }
];

router.post('/api/posts/fetch', function(req, res) {
    res.send(DB);
});


module.exports = router;