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
    res.send(DB);
    console.log(DB);
    res.status(200);
});

router.get('/api/posts/fetch_newest', (req, res) => {
    console.log("Fetching Newest");
    console.log(DB);

    if (DB.length === 0) {
        return res.status(404).send({ message: "No posts available" });
    }

    const newestPost = DB.reduce((max, post) => (post.postid > max.postid ? post : max), DB[0]);
    res.status(200).send(newestPost);
});

router.post('/api/posts/create', (req, res) => {
    const newPost = req.body;
    DB.push(newPost);
    req.body.postid = id++;
    console.log("Creating Posts");
    res.status(200).send(newPost);
});

module.exports = router;
