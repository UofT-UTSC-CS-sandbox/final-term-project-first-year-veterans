const express = require('express');
const router = express.Router();
const path = require('path');

let videos = {
  1: { id: 1, title: 'What is DevOps? ', url: 'https://www.youtube.com/watch?v=0yWAtQ6wYNM' },
  2: { id: 2, title: 'React Tutorial for Beginners', url: 'https://www.youtube.com/watch?v=SqcY0GlETPk' },
};

let notes = {
  1: { id: 1, video_id: 1, content: 'This is a note', timestamp: 10 },
  2: { id: 2, video_id: 1, content: 'This is another note', timestamp: 20 },
};


// Fetch all videos
router.get('/api/videos', (req, res) => {
  console.log('Fetching all videos');
  res.json(videos);
});

// Fetch a specific video by ID
router.get('/api/videos/:id', (req, res) => {
  console.log('Fetching video with id: ' + req.params.id);
  const video = videos[req.params.id];
  if (!video) {
    return res.status(404).send('Video not found');
  }

  res.json(video);
});

router.get('/api/videos/notes/:id', (req, res) => {
  console.log('Fetching all notes');
  const video = videos[req.params.id];


  res.json(notes);
});

module.exports = router;
