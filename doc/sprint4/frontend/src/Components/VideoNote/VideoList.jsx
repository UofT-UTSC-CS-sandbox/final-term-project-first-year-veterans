import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography, Button, Grid } from '@mui/material';
import { api_all_videos_fetch } from '../../API/VideoNoteAPI.jsx';

const VideoList = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    api_all_videos_fetch((data) => {
      setVideos(Object.values(data));
    }
    );
    
  }, []);

  return (
    <Grid container spacing={2}>
      {videos.map((video) => (
        <Grid item xs={12} key={video.id}>
          <Card>
            <CardContent>
                <Typography variant="h5" component="div" sx={{marginBottom:"2rem"}}>
                  {video.title}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  to={`/main/video/${video.id}`} // Use the video ID in the URL
                >
                  Watch Video
                </Button>
              </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default VideoList;
