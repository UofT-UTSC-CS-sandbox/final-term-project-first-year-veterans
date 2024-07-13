import * as React from 'react';
import { useState, useEffect } from 'react'; 
import { usePage } from './PageContext';
import { api_friend_fetch } from './api';
import { api_follow_fetch } from './api';
import { api_follower_fetch } from './api';
import { api_friend_remove } from './api';
import { api_user_unfollow } from './api';
import { api_user_followback } from './api';
import { api_friendRequests_fetch } from './api';
import { api_friendRequests_accept } from './api';
import { api_friendRequests_reject } from './api';
import { api_friendList_search } from './api';

import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import { styled, alpha } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import ChatIcon from '@mui/icons-material/Chat';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import GitHubIcon from '@mui/icons-material/GitHub';
import SearchIcon from '@mui/icons-material/Search';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonOffIcon from '@mui/icons-material/PersonOff';

const uid = 'Richie_Hsieh'; // Hardcoded user id for testing

// Buttons for each friend/follow/follower
const buttons = [
  { icon: <AccountBoxIcon />, label: 'Account', tip: 'View Account'},
  { icon: <ChatIcon />, label: 'Chat', tip: 'Chat'},
  { icon: <GitHubIcon />, label: 'Github', tip: 'Github'},
];

// Styling for the search bar
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,

  backgroundColor: alpha(theme.palette.grey[700], 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.grey[800], 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  [theme.breakpoints.up('sm')]: {
    width: '66%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '100%',
    },
  },
}));

export default function FriendList({setUserpageInfo}) {
  const [value, setValue] = React.useState('friend'); // Switch between Friend/Follow/Follower
  const [target, setTarget] = React.useState(null); // Check which following button is hovered
  const [friendList, setFriendList] = React.useState([]); // List of friends
  const [followList, setFollowList] = React.useState([]); // List of follows
  const [followerList, setFollowerList] = React.useState([]); // List of followers
  const [requests, setRequests] = React.useState([]); // List of requests for friendship
  const [open, setOpen] = React.useState(false); // Check if dialog is open
  const [searchTerm, setSearchTerm] = useState(''); // Search term for prefix search


  const callback = (data) => { // Fetch friendList data callback
    console.log(data.friends);
    setFriendList(data.friends);
  };

  const callback2 = (data) => { // Fetch followList data callback
    console.log(data.follows);
    setFollowList(data.follows);
  };

  const callback3 = (data) => { // Fetch followerList data callback
    console.log(data.followers);
    setFollowerList(data.followers);
  };

  const callback4 = (data, index) => { // Remove friend callback
    let newFriendList = [...friendList];
    newFriendList.splice(index, 1); 
    setFriendList(newFriendList);
    console.log(data);
  };

  const callback5 = (data, index) => { // Unfollow callback
    let newFollowList = [...followList];
    newFollowList.splice(index, 1); 
    setFollowList(newFollowList); 
    console.log(data);
  };

  const callback6 = (data, index) => { // Follow back callback
    let newFollowerList = [...followerList];
    newFollowerList[index].state = 'mutual';
    setFollowerList(newFollowerList); 
    console.log(data);
  };

  const callback7 = (data) => { // Fetch friend requests callback
    console.log(data.requests);
    setRequests(data.requests);
  };

  const callback8 = (data, index) => { // Accept/reject friend request callback
    let newRequests = [...requests];
    newRequests.splice(index, 1);
    setRequests(newRequests);
    console.log(data);
  };
  
  React.useEffect(() => {  // Fetch data when switching between tabs
    if (value === 'friend') api_friend_fetch({uid: uid}, callback);
    else if (value === 'follow') api_follow_fetch({uid: uid}, callback2);
    else if (value === 'follower') api_follower_fetch({uid: uid}, callback3);
    else if (value === 'request') api_friendRequests_fetch({uid: uid}, callback7);
  }, [value]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      console.log('do prefix search: ', searchTerm);
      api_friendList_search({uid: uid, label: value, prefix: searchTerm}, (data) => {
        if (value === 'friend') setFriendList(data.outcomes);
        else if (value === 'follow') setFollowList(data.outcomes);
        else if (value === 'follower') setFollowerList(data.outcomes);
        else if (value === 'request') setRequests(data.outcomes);
      });
    }, 300); // delay to avoid too many requests

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleClick = (e, label, userInfo, index) => { // Handle button clicks
    e.preventDefault();
    switch (label) {
      case 'Account': // Open user page
        setUserpageInfo(userInfo, label);
        break;
      case 'unfriend': // Open dialog for unfriending
        console.log('Unfriend');
        setOpen(true);
        break;
      case 'unfriend_confirm': // Confirm unfriending
        console.log('Unfriend confirmed');
        setOpen(false);
        api_friend_remove({uid: uid, friend_uid: userInfo.uid}, (data) => callback4(data, index));
        break;
      case 'unfollow': // Unfollow user
        console.log('Unfollow the user');
        api_user_unfollow({uid: uid, user_uid: userInfo.uid}, (data) => callback5(data, index));
        break;
      case 'followBack': // Follow back user
        if (userInfo.state === 'follower') {
          console.log('Follow back the user');
          api_user_followback({ uid: uid, user_uid: userInfo.uid }, (data) => callback6(data, index));
        }
        break;
      case 'accept': // Accept friend request
        console.log('Accept friend request');
        api_friendRequests_accept({uid: uid, user_uid: userInfo.uid }, (data) => callback8(data, index));
        break;
      case 'reject': // Reject friend request
        console.log('Reject friend request');
        api_friendRequests_reject({uid: uid, user_uid: userInfo.uid }, (data) => callback8(data, index));
        break;
      default:
        console.log('Button Clicked');
    }
  };

  const handleClose = () => { // Close dialog
    setOpen(false);
  };

  const handleChange = (event, newValue) => { // Switch between tabs
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '80%', typography: 'body1', marginLeft: 'auto', marginRight: 'auto'}}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', display:'flex' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Friend" value="friend" />
            <Tab label="Follow" value="follow" />
            <Tab label="Follower" value="follower" />
            <Tab label="Requests" value="request" />
          </TabList>
        </Box>

        <Search sx={{ marginBottom: '1em',  marginTop: '1em'}}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
        </Search>

        <TabPanel value="friend" key='1'>
          <List sx={{ 
            width: '100%', 
            maxWidth: '70%', 
            bgcolor: 'background.paper',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
          {friendList.map((friend, index) => ( // {uid, last_name, first_name}
            <div key={friend.uid}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt={friend.last_name} />
                </ListItemAvatar>
                <ListItemText
                  primary={friend.first_name + ' ' + friend.last_name}
                  secondary={
                    <Box sx={{ display: 'flex',}}> 
                      {buttons.map((button) => (
                        <Tooltip title={button.tip} key={button.label}>
                          <IconButton 
                            key={button.label}
                            edge="end" 
                            aria-label={button.label} 
                            sx={{ marginRight: "10px" }}
                            onClick={(e) => handleClick(e, button.label, friend, index)}
                          >
                            {button.icon}
                          </IconButton>
                        </Tooltip>
                      ))}
                      <Tooltip title="Unfriend">
                        <IconButton 
                          edge="end" 
                          aria-label="delete" 
                          sx={{ marginRight: "10px", marginLeft: 'auto'}}
                          onClick={(e) => handleClick(e, 'unfriend', friend, index)}
                        >
                          <PersonRemoveIcon />
                        </IconButton>
                      </Tooltip>
                      <Dialog
                          open={open}
                          onClose={handleClose}
                          aria-labelledby="alert-dialog-title"
                          aria-describedby="alert-dialog-description"
                        >
                          <DialogTitle id="alert-dialog-title">
                            {"Remove this use from your friend list?"}
                          </DialogTitle>
                          <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                              Removing this user from your friend list will permanently delete all interactions and conversations with them. 
                              Are you sure you want to proceed? This action cannot be undone.
                            </DialogContentText>
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button onClick={(e) => handleClick(e, 'unfriend_confirm', friend, index)} autoFocus>
                              Confirm
                            </Button>
                          </DialogActions>
                        </Dialog>
                    </Box>
                  }
                  secondaryTypographyProps={{ component: 'div' }}
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </div>
          ))}
          </List>
        </TabPanel>

        <TabPanel value="follow" key='2'>
          <List sx={{ 
            width: '100%', 
            maxWidth: '70%', 
            bgcolor: 'background.paper',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
          {followList.map((follow, index) => ( // {uid, last_name, first_name}
            <div key={follow.uid} >
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt={follow.last_name} />
                </ListItemAvatar>
                <ListItemText
                  primary={follow.first_name + ' ' + follow.last_name}
                  secondary={
                    <Box sx={{ display: 'flex',}}> 
                      {buttons.map((button) => (
                        <Tooltip title={button.tip} key={button.label}>
                          <IconButton 
                            edge="end" 
                            aria-label={button.label} 
                            sx={{ marginRight: "10px" }} 
                            key={button.label}
                            onClick={(e) => handleClick(e, button.label, follow, index)}
                          >
                            {button.icon}
                          </IconButton>
                        </Tooltip>
                      ))}
                      <Button 
                        variant="outlined" 
                        size="medium" 
                        sx={{ marginRight: "10px", marginLeft: 'auto',     
                        '&:hover': {
                          backgroundColor: 'pink',
                          color: 'red',
                        }}}
                        onClick={(e) => handleClick(e, 'unfollow', follow, index)}
                        onMouseEnter={() => {setTarget(index)}}
                        onMouseLeave={() => {setTarget(null)}}
                      >
                        {target===index ? 'Unfollow' : 'Following'}
                      </Button>
                    </Box>
                  }
                  secondaryTypographyProps={{ component: 'div' }}
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </div>
          ))}
          </List>
        </TabPanel>

        <TabPanel value="follower" key='3'>
          <List sx={{ 
            width: '100%', 
            maxWidth: '70%', 
            bgcolor: 'background.paper',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
          {followerList.map((follower, index) => ( //{state, uid, last_name, first_name}
            <div key={follower.uid}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt={follower.last_name} />
                </ListItemAvatar>
                <ListItemText
                  primary={follower.first_name + ' ' + follower.last_name}
                  secondary={
                    <Box sx={{ display: 'flex',}}> 
                      {buttons.map((button) => (
                        <Tooltip title={button.tip} key={button.label}>
                          <IconButton 
                            key={button.label}
                            edge="end" 
                            aria-label={button.label} 
                            sx={{ marginRight: "10px" }}
                            onClick={(e) => handleClick(e, button.label, follower, index)}
                          >
                            {button.icon}
                          </IconButton>
                        </Tooltip>
                      ))}
                      <Button 
                        variant="outlined" 
                        size="medium" 
                        sx={{ marginRight: "10px", marginLeft: 'auto', }}
                        onClick={(e) => handleClick(e, 'followBack', follower, index)}
                      >
                        {follower.state === 'follower' ? 'Follow Back' : 'Following'}
                      </Button>
                    </Box>
                  }
                  secondaryTypographyProps={{ component: 'div' }}
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </div>
          ))}
          </List>
        </TabPanel>

        <TabPanel value="request" key='4'>
          <List sx={{ 
            width: '100%', 
            maxWidth: '70%', 
            bgcolor: 'background.paper',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
          {requests.map((request, index) => ( //{uid, last_name, first_name}
            <div key={request.uid}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt={request.last_name} />
                </ListItemAvatar>
                <ListItemText
                  primary={request.first_name + ' ' + request.last_name}
                  secondary={
                    <Box sx={{ display: 'flex',}}> 
                      {buttons.map((button) => (
                        <Tooltip title={button.tip} key={button.label}>
                          <IconButton 
                            key={button.label}
                            edge="end" 
                            aria-label={button.label} 
                            sx={{ marginRight: "10px" }}
                            onClick={(e) => handleClick(e, button.label, request, index)}
                          >
                            {button.icon}
                          </IconButton>
                        </Tooltip>
                      ))}
                      <Tooltip title="Accept Request">
                        <IconButton 
                          edge="end" 
                          aria-label="delete" 
                          sx={{ marginRight: "10px", marginLeft: 'auto'}}
                          onClick={(e) => handleClick(e, 'accept', request, index)}
                        >
                          <PersonAddAlt1Icon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Reject Request">
                        <IconButton 
                          edge="end" 
                          aria-label="delete" 
                          sx={{ marginRight: "10px"}}
                          onClick={(e) => handleClick(e, 'reject', request, index)}
                        >
                          <PersonOffIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  }
                  secondaryTypographyProps={{ component: 'div' }}
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </div>
          ))}
          </List>
        </TabPanel>
      </TabContext>
    </Box>
  );
}