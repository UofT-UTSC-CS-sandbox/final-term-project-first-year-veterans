const express = require('express');
const router = express.Router();
const path = require('path');
const verifyToken = require('../../Middleware/verifyCookie');


let videoID = 2;
let videos = [
  { uid: '', videoID: 1, videoTitle: 'What is DevOps? ', videoURL: 'https://www.youtube.com/watch?v=0yWAtQ6wYNM' },
  { uid: '', videoID: 2, videoTitle: 'React Tutorial for Beginners', videoURL: 'https://www.youtube.com/watch?v=SqcY0GlETPk' }

]


// Fetch all videos
router.get('/api/videos', (req, res) => {
  // Later implementation will fetch videos based on the user's ID

  console.log('Fetching all videos');
  res.json(videos);
});

// Fetch a specific video by ID
router.get('/api/videos/:id', verifyToken, (req, res) => {

  console.log('Fetching a video');
  console.log(req.params.id);

  // User filter to get the videoID match id
  const video = videos.filter(video => video.videoID == req.params.id);
  if (!video) {
    return res.status(404).send('Video not found');
  }
  res.json(video);
});


// Create a video
router.post('/api/create/video',verifyToken,  (req, res) => {
  
  console.log('Creating a video');
  const { videoTitle, videoURL } = req.body;
  videoID+=1;
  const video = { uid: '', videoID: videoID, videoTitle: videoTitle, videoURL: videoURL };
  videos.push(video);
  res.json(video);
});

router.delete('/api/delete/video/:id',verifyToken, (req, res) => {

  console.log('Deleting a video');
  const video = videos.find(video => video.videoID == req.params.id);

  if (!video) {

    return res.status(404).send('Video not found');

  }

  videos = videos.filter(video => video.videoID != req.params.id);

  res.json(video);

});


module.exports = router;
