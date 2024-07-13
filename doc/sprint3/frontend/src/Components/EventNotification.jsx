/*
  Reference: I have used CHATGPT, Github Copilot and my own knowledge to code the following file.
*/

import React, { useEffect, useState } from 'react';
import { IconButton, Badge, Popover, List, ListItem, ListItemText } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { api_calendar_fetch, api_update_event } from '../API/CalendarAPI.jsx';
import { Divider } from '@mui/material';
import { Checkbox } from '@mui/material';

const Notification = ({ notificationTrigger, setNotificationTrigger }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const stringMonth = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const today = new Date();

  useEffect(() => {
    api_calendar_fetch((data) => {
      const allNotification = data.filter((event) => {
        if (event.notificationTime === undefined || event.notificationTime === null) {
          return false;
        }
        const notificationTime = new Date(event.notificationTime);
        return (notificationTime <= today);
      });

      setNotifications(allNotification.map((event, index) => ({
        index: index,
        id: event.id,
        title: event.title,
        start: new Date(event.start),
        end: new Date(event.end),
        notificationTime: new Date(event.notificationTime)
      })).sort((a, b) => a.start - b.start));
    });
  }, [today, notificationTrigger]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'notification-popover' : undefined;

  const handleOnClick = (notification) => {
    setNotifications(notifications.filter((event) => event.id !== notification.id));
    api_update_event(notification.id, {
      title: notification.title,
      start: notification.start,
      end: notification.end,
      notificationTime: null
    }, (data) => {
      console.log("=== handle Update Event ===");
      console.log(data);
      console.log("=== End of handle Update Event ===");
    });
    setNotificationTrigger(new Date());
  };

  return (
    <div>
      <IconButton color="inherit" onClick={handleClick}>
        <Badge badgeContent={notifications.length} color="error">
          <NotificationsIcon color='primary' />
        </Badge>
      </IconButton>
      {notifications.length > 0 ? (
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <List sx={{
            overflow: 'auto', maxHeight: '15rem', '&::-webkit-scrollbar': {
              width: '10px',
            },
            '&::-webkit-scrollbar-track': {
              background: '#E0E0E0',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#888',
              borderRadius: '1rem',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              backgroundColor: '#555',
            }
          }}>
            {notifications.map((notification, index) => (
              <div key={notification.id}>
                <ListItem>
                  <Checkbox
                    edge="start"
                    onChange={() => handleOnClick(notification)}
                  />
                  <ListItemText
                    sx={{
                      paddingLeft: '0.1rem',
                      paddingRight: '0.1rem',
                      '& .MuiListItemText-primary': { color: 'red', fontWeight: 'bold' }
                    }}
                    primary={`${index + 1}. Event: ${notification.title}`}
                    secondary={`${notification.start.getFullYear()}/${stringMonth[notification.start.getMonth()]}/${notification.start.getDate()} ${String(notification.start.getHours()).padStart(2, '0')}:${String(notification.start.getMinutes()).padStart(2, '0')}`}
                  />
                </ListItem>
                {(notifications.length - 1) > index && <Divider component="li" />}
              </div>
            ))}
          </List>
        </Popover>
      ) : null}
    </div>
  );
};

export default Notification;
