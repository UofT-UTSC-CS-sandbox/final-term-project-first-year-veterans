import React, { useEffect, useState } from 'react';
import { IconButton, Badge, Popover, List, ListItem, ListItemText } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { api_calendar_fetch } from './api';

const Notification = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const[notifications, setNotifications] = useState([]);
  const stringMonth = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const today = new Date();

  useEffect(() => {

    api_calendar_fetch((data) => {
      const allNotification = data.filter((event) => {

        if(event.notificationTime === undefined || event.notificationTime === null){
          return false;
        }
        const notificationTime = new Date(event.notificationTime);
        return ((notificationTime <= today)
        );
      });

      setNotifications(allNotification.map((event) => ({
        id: event.id,
        title: event.title,
        start: new Date(event.start),
        end: new Date(event.end),
        notificationTime: new Date(event.notificationTime)
      })));

    });

  }, [anchorEl, props.NotificationIcon]);


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'notification-popover' : undefined;

  return (
    <div>
      <IconButton color="inherit" onClick={handleClick}>
        <Badge badgeContent={notifications.length} color="error">
          <NotificationsIcon  color='primary'/>
        </Badge>
      </IconButton>
      {(notifications.length > 0) ? <Popover
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
        <List>
          {notifications.map((notification, index) => (
            <ListItem key={index} >
              <ListItemText primary={notification.title} secondary={notification.start.getFullYear() + ' '+stringMonth[notification.start.getMonth()]+ ' ' + ' ' + notification.start.getDate()}/>
            </ListItem>
          ))}
        </List>
      </Popover>:
      null
      
      
      }
    </div>
  );
};

export default Notification;
