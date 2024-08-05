import React from 'react';
import { Grid, Avatar, Typography, Button, Link, Paper, Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { styled } from '@mui/system';

import ChatIcon from '@mui/icons-material/Chat';
import GitHubIcon from '@mui/icons-material/GitHub';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import HowToRegIcon from '@mui/icons-material/HowToReg';

import IconButton from '@mui/material/IconButton';

const ProfileContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginTop: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
}));

const ActionButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
}));

// userpageInfo: {uid, last_name, first_name}, label: 'follower' | 'friend' | 'follow' | 'request'
export default function UserPage() { 
  const location = useLocation();
  const userpageInfo = location.state.userpageInfo;
  const label = location.state.label;
  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={8} md={6}>
        <ProfileContainer elevation={3}>
          <Avatar
            alt="Profile Picture"
            src="/path/to/profile-picture.jpg"
            sx={{ width: 100, height: 100 }}
          />
          <Typography variant="h5" component="h1" gutterBottom>
            {userpageInfo.first_name + " " + userpageInfo.last_name} 
          </Typography>
          <Typography variant="h5" component="h1" gutterBottom>
            {userpageInfo.uid}
          </Typography>
          <Typography variant="body1">
            University of Toronto Mississauga Student
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Canada ON Mississauga · <Link href="#">Contact Info</Link>
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
          <IconButton 
                edge="end" 
                aria-label='Add Friend' 
                sx={{ marginRight: "10px" }}
            >
                <PersonAddIcon />
            </IconButton>
            <IconButton 
                edge="end" 
                aria-label='Chat' 
                sx={{ marginRight: "10px" }}
            >
                <ChatIcon />
            </IconButton>
            <IconButton 
                edge="end" 
                aria-label='GitHub' 
                sx={{ marginRight: "10px" }}
            >
                <GitHubIcon />
            </IconButton>
            <ActionButton variant="outlined"> 
            {label === 'follow' 
                ? 'FOLLOWING' 
                : (label === 'follower' && userpageInfo.state === 'mutual' 
                  ? 'FOLLOWING' 
                  : 'FOLLOW')}
            </ActionButton>
          </Box>
          <Paper variant="outlined" sx={{ padding: 2, marginTop: 2, width: '100%' }}>
            <Typography variant="body2">
              Personal Information...
            </Typography>
          </Paper>
          <Paper variant="outlined" sx={{ padding: 2, marginTop: 2, width: '100%' }}>
            <Typography variant="body2">
              Posts...
            </Typography>
          </Paper>
        </ProfileContainer>
      </Grid>
    </Grid>
  );
};