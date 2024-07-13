import * as React from 'react';
import Box from '@mui/material/Box';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ArrowRight from '@mui/icons-material/ArrowRight';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import People from '@mui/icons-material/People';
import Avatar from '@mui/material/Avatar';
import { useState, useEffect, useRef } from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { api_logout } from './api';

// Data array now includes Logout
const data = [
    { icon: <AccountCircleIcon />, label: 'Profile' },
    { icon: <People />, label: 'Friends' },
    { icon: <SettingsIcon />, label: 'Settings' },
    { icon: <LogoutIcon />, label: 'Logout' },
];

const FireNav = styled(List)({
  '& .MuiListItemButton-root': {
    paddingLeft: 24,
    paddingRight: 24,
  },
  '& .MuiListItemIcon-root': {
    minWidth: 0,
    marginRight: 16,
  },
  '& .MuiSvgIcon-root': {
    fontSize: 20,
  },
});

export default function UserTools({handleClick}) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();


  const handleLogout = () => {
      const logout = {};
      api_logout(logout, (data) => {
          if (data.logoutStatus) {
              navigate('/login');
          }
      });
  };


  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', height: "40px" }}>
      <ThemeProvider
        theme={createTheme({
          components: {
            MuiListItemButton: {
              defaultProps: {
                disableTouchRipple: true,
              },
            },
          },
          palette: {
            mode: 'dark',
            primary: { main: 'rgb(102, 157, 246)' },
            background: { paper: 'rgb(5, 30, 52)' },
          },
        })}
      >
        <Paper elevation={0} sx={{ maxWidth: 256, height: "40px" }}>
          <FireNav component="nav" disablePadding>
            <Box
              sx={{
                bgcolor: open ? 'rgba(71, 98, 130, 0.2)' : null,
                height: "40px",
              }}
            >
              <ListItemButton
                alignItems="flex-start"
                onClick={() => setOpen(!open)}
                sx={{
                  px: 3,
                  '&:hover, &:focus': { '& svg': { opacity: open ? 1 : 0 } },
                  height: "40px",
                  padding: 0,
                }}
              >
                <ListItemText
                  primary="Hi! Richie"
                  primaryTypographyProps={{
                    fontSize: 15,
                    fontWeight: 'medium',
                    lineHeight: '40px',
                    mb: '2px',
                    height: "40px",
                    minWidth: '87.64px',
                  }}
                  sx={{ my: 0, textAlign: 'center', height: "40px"}}
                />
                <KeyboardArrowDown
                  sx={{
                    mr: -1,
                    opacity: 0,
                    transform: open ? 'rotate(-180deg)' : 'rotate(0)',
                    transition: '0.2s',
                    lineHeight: '40px',
                    height: "2em",
                  }}
                />
              </ListItemButton>
              {open &&
                data.map((item) => (
                  <ListItemButton
                    key={item.label}
                    onClick={(e) => {
                        if (item.label === 'Logout') {
                            handleLogout();
                        } else {

                          handleClick(e, item.label); // Where the handleClick function change the pageContent
                        }
                        setOpen(false);
                    }}
                    sx={{ 
                        py: 0, 
                        minHeight: 32, 
                        color: 'rgba(0,0,0)', 
                        backgroundColor: 'rgb(224, 224, 224)',
                        '&:hover': {
                            backgroundColor: 'rgb(240, 240, 240)',
                        },
                        zIndex: 1000,
                    }}
                  >
                    <ListItemIcon sx={{ color: 'inherit' }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }}
                    />
                  </ListItemButton>
                ))}
            </Box>
          </FireNav>
        </Paper>
      </ThemeProvider>
    </Box>
  );
}
