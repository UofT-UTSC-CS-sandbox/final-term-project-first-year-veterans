const express = require('express');
const router = express.Router();

router.use(express.json());

let id = 3;

let DB = [
  { postid: 1, userId: "Richie_Hsieh", postTitle: "Introduction 1", postMessage: "My name is Richie! This is my first post", likeCount: 100, comments: [{userId: "Andy", comment: "Love it!", postidentification: 1}, {userId: "Ethan", comment: "Love it as well!", postidentification: 1}] },
  { postid: 2, userId: "Andy", postTitle: "Introduction 2", postMessage: "My name is Andy! This is my first post", likeCount: 0, comments: [{userId: "Richie_Hsieh", comment: "Love it!", postidentification: 2}] }
];

router.get('/api/posts/fetch', (req, res) => {
  console.log("Fetching Post Data");
  res.status(200).send(DB);
  console.log(DB);
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
  const newPost = { ...req.body, postid: id++, comments: [] }; // Ensure the new post has a comments array
  DB.push(newPost);
  console.log("Creating Post");
  res.status(200).send(newPost);
});

router.post('/api/posts/update_like/:postId', (req, res) => {
  const postId = parseInt(req.params.postId, 10);
  const newLikeCount = req.body.likeCount;

  const post = DB.find(p => p.postid === postId);

  if (!post) {
    return res.status(404).send({ message: "Post not found" });
  }

  post.likeCount = newLikeCount;

  console.log(`Updating like count for post ${postId}`);
  res.status(200).send(post);
});

router.post('/api/posts/add_new_comment/:postId', (req, res) => {
  const postId = parseInt(req.params.postId, 10);
  const { userId, comment } = req.body; // Destructure userId and comment from req.body directly

  const post = DB.find(p => p.postid === postId);

  if (!post) {
    return res.status(404).send({ message: "Post not found" });
  }

  const newComment = {
    userId: userId,
    comment: comment,
    postIdentification: postId
  };

  post.comments.push(newComment);

  console.log(`Adding new comment to post ${postId}`);
  res.status(200).send(post);
});



router.get('/api/posts/:postId/comments', (req, res) => {
  const postId = parseInt(req.params.postId, 10);
  const post = DB.find(p => p.postid === postId);

  if (!post) {
    return res.status(404).send({ message: "Post not found" });
  }

  res.status(200).send(post.comments);
});

// Need to fix
router.get('/api/expandedposts/:postId', (req, res) => {
  const postId = parseInt(req.params.postId, 10);
  const post = DB.find(p => p.postid === postId);

  if (!post) {
    return res.status(404).send({ message: "Post not found" });
  }

  res.status(200).send(post);
});

module.exports = router;
