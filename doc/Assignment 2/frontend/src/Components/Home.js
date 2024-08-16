import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Box, IconButton, Avatar } from '@mui/material';
import DailyPlanCard from './DailyCalendarCard'; // Assuming you have a component named DailyPlanCard for the daily plan section
import { api_fetch_newest_post, api_fetch_random } from '../API/PostsApi.js';
import PostCard from './Posts/PostCard';
import GroupBar from './GroupBar';
import CircularProgress from '@mui/material/CircularProgress';

const HomePage = () => {
  // Modify your frontend to handle a single post object instead of an array
  const [post, setPost] = useState(null); // State to hold the newest post
  const [loading, setLoading] = useState(true);
  let uid = "Richie_Hsieh";

  useEffect(() => {
    api_fetch_random(uid,(data) => {
      setPost(data); // Set the single post object received from the backend
      console.log(data);
      setLoading(false);
    });
  }, []);

  return (
    <Container style={{ textAlign: 'center', marginTop: '20px', maxWidth: '100%' }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Box bgcolor="#e0e7ff" padding="10px" borderRadius="10px" marginBottom="20px">
            <Typography variant="h6">Groups</Typography>
            <GroupBar />
          </Box>
        </Grid>

        <Grid item xs={7}>
          {loading ? (
            <CircularProgress />
          ) : (
            post.map(post => (
              <PostCard key={post.postid} post={post} />
           ))
        )}
     
        </Grid>

        <Grid item xs={3}>
          <Box bgcolor="#e0e7ff" padding="10px" borderRadius="10px" marginBottom="20px">
            <Typography variant="h6">People You May Be Interested In</Typography>
            {/* Add carousel or list of people here */}
          </Box>
          <DailyPlanCard />
        </Grid>
      </Grid>
    </Container>
  );

};

export default HomePage;