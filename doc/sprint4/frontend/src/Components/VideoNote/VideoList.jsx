import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography, Button, Grid, Box, Container, CardActionArea } from '@mui/material';
import { IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { api_all_videos_fetch, api_delete_video } from '../../API/VideoNoteAPI.jsx';

const VideoList = () => {
  const [videos, setVideos] = useState([]);

  // Fetch all videos
  useEffect(() => {

    api_all_videos_fetch((data) => {

      console.log('====== Fetch All into VideoList  ======');
      console.log(data);

      setVideos(data);
      console.log('====== Finish fetch all video into VideoList  ======');

    });

  }, []);

  const handleDelete = (id) => {

    console.log("Deleting video with id:", id);
    api_delete_video(id, (data) => {

      console.log(data);

    });

    // Refetch videos after deleting
    api_all_videos_fetch((data) => {

      setVideos(data);

    });

  };

  return (
    <Container maxWidth="lg">

      <Typography variant="h2" gutterBottom sx={{ marginBottom: '3rem' }}>

        Your Videos

      </Typography>
      
      <Box display="flex" justifyContent="flex-end" mb={2}>

        <Button to={`/main/video/create`} component={Link} variant="contained" color="primary">

          + Create a new video

        </Button>

      </Box>

      <Grid container spacing={2}>

        {videos.map((video) => (
          <Grid item xs={12} key={video.videoID}>
            <Card >
              
                

                <CardContent>
                  <Box display='flex' justifyContent='flex-end'>
                      <IconButton
                      aria-label="delete"
                      onClick={() => handleDelete(video.videoID)}
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                  <Typography variant="h5" component="div" sx={{ marginBottom: '2rem' }}>
                    {video.videoTitle}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to={`/main/video/${video.videoID}`}
                  >
                    Watch Video
                  </Button>
                </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default VideoList;
