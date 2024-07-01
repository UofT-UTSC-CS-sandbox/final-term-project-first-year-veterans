import * as React from 'react';
import { usePage } from './PageContext';
import { api_friend_fetch } from './api';
import { api_follow_fetch } from './api';
import { api_follower_fetch } from './api';
import { api_friend_remove } from './api';

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
  const [value, setValue] = React.useState('1'); // Switch between Friend/Follow/Follower
  const [hover, setHover] = React.useState(false); // Check if following button is hovered
  const [target, setTarget] = React.useState(null); // Check which following button is hovered
  const [friendList, setFriendList] = React.useState([]); // List of friends
  const [followList, setFollowList] = React.useState([]); // List of follows
  const [followerList, setFollowerList] = React.useState([]); // List of followers
  const [open, setOpen] = React.useState(false); // Check if dialog is open

  const { currentPage, handlePageChange } = usePage(); // handle page switching for user page

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

  const callback4 = (data) => { // Remove friend callback
    api_friend_fetch({uid: uid}, callback);
    console.log(data);
  };

  React.useEffect(() => {  // Fetch data when switching between tabs
    if (value === '1') api_friend_fetch({uid: uid}, callback);
    else if (value === '2') api_follow_fetch({uid: uid}, callback2);
    else if (value === '3') api_follower_fetch({uid: uid}, callback3);
  }, [value]);

  React.useEffect(() => { // Update friendList and re-render
    console.log('FriendList Updated');
  }, [friendList]);

  const handleClick = (e, label, userInfo) => { // Handle button clicks
    e.preventDefault();
    switch (label) {
      case 'Account': // Open user page
        setUserpageInfo(userInfo);
        handlePageChange('User');
        break;
      case 'unfriend': // Open dialog for unfriending
        console.log('Unfriend');
        setOpen(true);
        break;
      case 'unfriend_confirm': // Confirm unfriending
        console.log('Unfriend confirmed');
        setOpen(false);
        api_friend_remove({uid: uid, friend_uid: userInfo[0]}, callback4);
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
            <Tab label="Friend" value="1" />
            <Tab label="Follow" value="2" />
            <Tab label="Follower" value="3" />
            <Tab label="Requests" value="4" />
          </TabList>
        </Box>

        <Search sx={{ marginBottom: '1em',  marginTop: '1em'}}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
        </Search>

        <TabPanel value="1" key='1'>
          <List sx={{ 
            width: '100%', 
            maxWidth: '70%', 
            bgcolor: 'background.paper',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
          {friendList.map((friend) => ( // [uid, last_name, first_name]
            <div key={friend[0]}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt={friend[1]} />
                </ListItemAvatar>
                <ListItemText
                  primary={friend[2] + ' ' + friend[1]}
                  secondary={
                    <Box sx={{ display: 'flex',}}> 
                      {buttons.map((button) => (
                        <Tooltip title={button.tip} key={button.label}>
                          <IconButton 
                            key={button.label}
                            edge="end" 
                            aria-label={button.label} 
                            sx={{ marginRight: "10px" }}
                            onClick={(e) => handleClick(e, button.label, friend)}
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
                          onClick={(e) => handleClick(e, 'unfriend', friend)}
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
                            <Button onClick={(e) => handleClick(e, 'unfriend_confirm', friend)} autoFocus>
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

        <TabPanel value="2" key='2'>
          <List sx={{ 
            width: '100%', 
            maxWidth: '70%', 
            bgcolor: 'background.paper',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
          {followList.map((follow, index) => ( // [uid, last_name, first_name]
            <div key={follow[0]}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt={follow[1]} />
                </ListItemAvatar>
                <ListItemText
                  primary={follow[2] + ' ' + follow[1]}
                  secondary={
                    <Box sx={{ display: 'flex',}}> 
                      {buttons.map((button) => (
                        <Tooltip title={button.tip} key={button.label}>
                          <IconButton edge="end" aria-label={button.label} sx={{ marginRight: "10px" }} key={button.label}>
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
                        onMouseEnter={() => {setHover(true); setTarget(index)}}
                        onMouseLeave={() => {setHover(false); setTarget(null)}}
                      >
                        {hover & target===index ? 'Unfollow' : 'Following'}
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

        <TabPanel value="3" key='3'>
          <List sx={{ 
            width: '100%', 
            maxWidth: '70%', 
            bgcolor: 'background.paper',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
          {followerList.map((follower, index) => ( //[uid, last_name, first_name]
            <div key={follower[0]}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt={follower[1]} />
                </ListItemAvatar>
                <ListItemText
                  primary={follower[2] + ' ' + follower[1]}
                  secondary={
                    <Box sx={{ display: 'flex',}}> 
                      {buttons.map((button) => (
                        <Tooltip title={button.tip} key={button.label}>
                          <IconButton edge="end" aria-label={button.label} sx={{ marginRight: "10px" }} key={button.label}>
                            {button.icon}
                          </IconButton>
                        </Tooltip>
                      ))}
                      <Button 
                        variant="outlined" 
                        size="medium" 
                        sx={{ marginRight: "10px", marginLeft: 'auto', }}
                      >
                        Follow Back
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

        <TabPanel value="4" key='4'>
          <List sx={{ 
            width: '100%', 
            maxWidth: '70%', 
            bgcolor: 'background.paper',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
          {followerList.map((follower, index) => ( //[uid, last_name, first_name]
            <div key={follower[0]}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt={follower[1]} />
                </ListItemAvatar>
                <ListItemText
                  primary={follower[2] + ' ' + follower[1]}
                  secondary={
                    <Box sx={{ display: 'flex',}}> 
                      {buttons.map((button) => (
                        <Tooltip title={button.tip} key={button.label}>
                          <IconButton edge="end" aria-label={button.label} sx={{ marginRight: "10px" }} key={button.label}>
                            {button.icon}
                          </IconButton>
                        </Tooltip>
                      ))}
                      <Button 
                        variant="outlined" 
                        size="medium" 
                        sx={{ marginRight: "10px", marginLeft: 'auto', }}
                      >
                        Follow Back
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
      </TabContext>
    </Box>
  );
}