import * as React from 'react';
import { usePage } from './PageContext';

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

import ChatIcon from '@mui/icons-material/Chat';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import GitHubIcon from '@mui/icons-material/GitHub';
import SearchIcon from '@mui/icons-material/Search';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';



const buttons = [
  { icon: <AccountBoxIcon />, label: 'Account' },
  { icon: <ChatIcon />, label: 'Chat' },
  { icon: <GitHubIcon />, label: 'Github' },
];

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

export default function FriendList({setUserpage_uid}) {
  const [value, setValue] = React.useState('1');
  const [hover, setHover] = React.useState(false);
  const [target, setTarget] = React.useState(null);

  const { currentPage, handlePageChange } = usePage();

  const handleClick = (e, label, uid) => {
    e.preventDefault();
    if (label === 'Account') {
      setUserpage_uid(uid);
      handlePageChange('User');
    }
  };

  var friends = [
    {
      name: "Remy Sharp",
      avatar: "/static/images/avatar/1.jpg",
      uid: 'Richie_Hsieh',
    },
    {
      name: "Travis Howard",
      avatar: "/static/images/avatar/2.jpg",
      uid: 'Richie_Hsieh',
    }
  ];

  var follows = [
    {
      name: "Remy Sharp",
      avatar: "/static/images/avatar/1.jpg",
    },
    {
      name: "Travis Howard",
      avatar: "/static/images/avatar/2.jpg",
    }
  ];

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

//   <IconButton 
//   edge="end" 
//   aria-label="delete" 
//   sx={{ 
//     marginRight: "10px", 
//     marginLeft: 'auto',
// }}>
//   <PersonAddIcon />
// </IconButton>

  return (
    <Box sx={{ width: '80%', typography: 'body1', marginLeft: 'auto', marginRight: 'auto'}}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', display:'flex' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Friend" value="1" />
            <Tab label="Follow" value="2" />
            <Tab label="Follower" value="3" />
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

        <TabPanel value="1">
          <List sx={{ 
            width: '100%', 
            maxWidth: '70%', 
            bgcolor: 'background.paper',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
          {friends.map((friend) => (
            <div>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt={friend.name} src={friend.avatar} />
                </ListItemAvatar>
                <ListItemText
                  primary={friend.name}
                  secondary={
                    <Box sx={{ display: 'flex',}}> 
                      {buttons.map((button) => (
                        <IconButton 
                          edge="end" 
                          aria-label={button.label} 
                          sx={{ marginRight: "10px" }}
                          onClick={(e) => handleClick(e, button.label, friend.uid)}
                        >
                          {button.icon}
                        </IconButton>
                      ))}
                      <IconButton edge="end" aria-label="delete" sx={{ marginRight: "10px", marginLeft: 'auto'}}>
                        <PersonRemoveIcon />
                      </IconButton>
                    </Box>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </div>
          ))}
          </List>
        </TabPanel>

        <TabPanel value="2">
          <List sx={{ 
            width: '100%', 
            maxWidth: '70%', 
            bgcolor: 'background.paper',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
          {follows.map((follow, index) => (
            <div>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt={follow.name} src={follow.avatar} />
                </ListItemAvatar>
                <ListItemText
                  primary={follow.name}
                  secondary={
                    <Box sx={{ display: 'flex',}}> 
                      {buttons.map((button) => (
                        <IconButton edge="end" aria-label={button.label} sx={{ marginRight: "10px" }}>
                          {button.icon}
                        </IconButton>
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
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </div>
          ))}
          </List>
        </TabPanel>

        <TabPanel value="3">
          <List sx={{ 
            width: '100%', 
            maxWidth: '70%', 
            bgcolor: 'background.paper',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
          {follows.map((follow, index) => (
            <div>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt={follow.name} src={follow.avatar} />
                </ListItemAvatar>
                <ListItemText
                  primary={follow.name}
                  secondary={
                    <Box sx={{ display: 'flex',}}> 
                      {buttons.map((button) => (
                        <IconButton edge="end" aria-label={button.label} sx={{ marginRight: "10px" }}>
                          {button.icon}
                        </IconButton>
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