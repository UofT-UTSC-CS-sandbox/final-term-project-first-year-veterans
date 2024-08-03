import React from 'react';
import { Container, Grid, Paper, Avatar, Typography, Button, Tabs, Tab, TextField, IconButton, Box, Divider, List, ListItem, ListItemAvatar, ListItemText, ListItemIcon } from '@mui/material';
import { Add as AddIcon, Share as ShareIcon, PersonAdd as PersonAddIcon, MoreVert as MoreVertIcon } from '@mui/icons-material';
import { InputAdornment } from '@mui/material';
import { AvatarGroup } from '@mui/lab';
import PhotoIcon from '@mui/icons-material/Photo';
import PollIcon from '@mui/icons-material/Poll';

function GroupPage() {
  return (
    <Container maxWidth="lg">
      <Paper elevation={3} sx={{ padding: 2, marginTop: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8} style={{marginLeft: 'auto', marginRight: 'auto'}}>
            <Typography variant="h4" gutterBottom>
                First Year Veterans
            </Typography>
            <Grid container spacing={1} alignItems="center">
              <Grid item>
                <AvatarGroup max={10}>
                  {Array.from({ length: 20 }).map((_, index) => (
                    <Avatar key={index} src={`https://via.placeholder.com/40?text=${index + 1}`} />
                  ))}
                </AvatarGroup>
              </Grid>
              <Grid item>
                <Button variant="contained" startIcon={<PersonAddIcon />}>
                  INVITE
                </Button>
                <Button variant="contained" startIcon={<ShareIcon />} sx={{ marginLeft: 1 }}>
                  SHARE
                </Button>
                <Button variant="contained" startIcon={<AddIcon />} sx={{ marginLeft: 1 }}>
                  JOIN
                </Button>
              </Grid>
            </Grid>
            <Tabs value={0} indicatorColor="primary" textColor="primary" variant="fullWidth" sx={{ marginTop: 2 }}>
              <Tab label="About" />
              <Tab label="Forum" />
              <Tab label="Hot Posts" />
              <Tab label="Members" />
              <Tab label="Audio & Video" />
            </Tabs>
          </Grid>
        </Grid>
      </Paper>
      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Say Something……"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Avatar src="https://via.placeholder.com/40" />
                  </InputAdornment>
                ),
              }}
            />
            <Grid container spacing={1} justifyContent="center" sx={{ marginTop: 1 }}>
              <Button variant="outlined" startIcon={<PhotoIcon />} style={{marginRight: '10px'}}>Images / Videos</Button>
              <Button variant="outlined" startIcon={<PollIcon />}>Voting</Button>
            </Grid>
          </Paper>
          <Paper elevation={3} sx={{ padding: 2, marginTop: 2 }}>
            <Typography variant="h6">Hot Posts</Typography>
            <List>
              
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
            <Paper elevation={1} sx={{ padding: 2 }}>
              <Typography variant="h6">About</Typography>
              <Typography variant="body2" gutterBottom>
                Welcome to our group! We are a group of first year veterans 
                who are passionate about learning and sharing knowledge. Feel free to join us!
              </Typography>
            </Paper>
            <Paper elevation={3} sx={{ padding: 2, marginTop: '20px' }}>
            <Typography variant="h6">Hot Videos & Audios</Typography>
            <List>
              {Array.from({ length: 5 }).map((_, index) => (
                <React.Fragment key={index}>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar src="https://via.placeholder.com/40" />
                    </ListItemAvatar>
                    <ListItemText
                      primary="Video Title"
                      secondary={
                        <>
                          <Typography component="span" variant="body2" color="textPrimary">
                            Some description
                          </Typography>
                        </>
                      }
                    />
                    <IconButton edge="end" aria-label="more">
                      <MoreVertIcon />
                    </IconButton>
                  </ListItem>
                  {index < 4 && <Divider component="li" />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
          </Grid>
      </Grid>
    </Container>
  );
}

export default GroupPage;