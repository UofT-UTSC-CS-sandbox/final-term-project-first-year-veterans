const express = require('express');
const router = express.Router();

router.use(express.json());

let id = 3;

let DB = [
  { postid: 1, userId: "Richie_Hsieh", postTitle: "Introduction 1", postMessage: "My name is Richie! This is my first post" },
  { postid: 2, userId: "Andy", postTitle: "Introduction 2", postMessage: "My name is Andy! This is my first post" }
];

router.get('/api/posts/fetch', (req, res) => {
    console.log("Fetching Post Data");
    res.status(200).send(DB);
});

router.post('/api/posts/create', (req, res) => {
    const newPost = req.body;
    DB.push(newPost);
    req.body.postid = ++id;
    console.log("Creating Posts");
    res.status(200).send(newPost);
});

module.exports = router;
