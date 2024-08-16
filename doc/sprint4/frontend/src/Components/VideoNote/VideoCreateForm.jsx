import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import { api_create_new_video } from '../../API/VideoNoteAPI.jsx';


const VideoCreateForm = ({ onSubmit }) => {
  const [videoTitle, setVideoTitle] = useState('');
  const [videoURL, setVideoURL] = useState('');
  const [uid, setUid] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const videoData = { videoTitle, videoURL };

    api_create_new_video(videoData, (data) => {
        console.log(data);
    });

    alert('Video created successfully');
    // Reset the form fields
    setVideoTitle('');
    setVideoURL('');
    setUid('');
  };

  return (
    <Container maxWidth="lg">
      <Box display="flex" justifyContent="flex-start" mb={2}>
        <Button  to={`/main/videos/`} component={Link} variant="contained" color="primary">
          Back to Videos Page
        </Button>
      </Box>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ maxWidth: 500, margin: 'auto', padding: 2, display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <Typography variant="h3" component="div" sx={{ marginBottom: "2rem" }}>
          Create a New Video
        </Typography>
        <TextField
          label="Title"
          variant="outlined"
          value={videoTitle}
          onChange={(e) => setVideoTitle(e.target.value)}
          required
        />
        <TextField
          label="Video URL"
          variant="outlined"
          value={videoURL}
          onChange={(e) => setVideoURL(e.target.value)}
          required
        />
        {/* <TextField
          label="UID"
          variant="outlined"
          value={uid}
          onChange={(e) => setUid(e.target.value)}
          required
        /> */}
        <Button variant="contained" color="primary" type="submit">
          Create Video
        </Button>
      </Box>
    </Container>
  );
};

export default VideoCreateForm;
