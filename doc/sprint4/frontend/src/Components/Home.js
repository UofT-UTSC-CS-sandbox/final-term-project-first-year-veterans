import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Grid, Box, IconButton, Avatar } from '@mui/material';
import DailyPlanCard from './DailyCalendarCard'; // Assuming you have a component named DailyPlanCard for the daily plan section
import { api_fetch_newest_post } from '../API/PostsApi.js';
import PostCard from './Posts/PostCard';
import GroupBar from './Group/GroupBar.jsx';
import { navigate } from 'react-big-calendar/lib/utils/constants.js';

const HomePage = ({uid, setUid}) => {
  // Modify your frontend to handle a single post object instead of an array
  const [post, setPost] = useState(null); // State to hold the newest post

  useEffect(() => {

    api_fetch_newest_post(uid,(data) => {
      setPost(data); // Set the single post object received from the backend
      console.log(data);
    });
  }, []);

  return (
    <Container style={{ textAlign: 'center', marginTop: '20px', maxWidth: '100%' }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Box bgcolor="#e0e7ff" padding="10px" borderRadius="10px" marginBottom="20px">
            <Typography variant="h6">Groups</Typography>
            <GroupBar uid={uid}/>
          </Box>
        </Grid>

        <Grid item xs={6}>
          {post ? (
            <PostCard key={post.id} post={post} /> // Render the single post object
          ) : (
            <Typography variant="h6">No posts available</Typography>
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