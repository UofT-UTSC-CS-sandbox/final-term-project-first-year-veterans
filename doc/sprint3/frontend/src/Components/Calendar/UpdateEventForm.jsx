/*
  Reference: I have used CHATGPT, Github Copilot  and my own knowledge to code the following file.
*/

import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Grid, IconButton } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import { api_update_event, api_delete_event } from '../../API/CalendarAPI.jsx';
import CloseIcon from '@mui/icons-material/Close';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function UpdateEventForm(props) {

  const [title, setTitle] = useState(props.title);
  const [startTime, setStartTime] = useState(dayjs(new Date(props.start)));
  const [endTime, setEndTime] = useState(dayjs(new Date(props.end)));

  // Initialize notification time and toggle based on props
  let initNotificationTime = props.notificationTime ? dayjs(new Date(props.notificationTime)) : dayjs(new Date(props.start));
  const [notificationTime, setNotificationTime] = useState(initNotificationTime);
  const [toggleNotification, setToggleNotification] = useState((props.notificationTime===null)?false:true);

  // Handlers
  const handleUpdateEvent = (event) => {
    console.log(notificationTime)
    api_update_event(props.id, {
      title: title,
      start: startTime,
      end: endTime,
      notificationTime: toggleNotification ? notificationTime : null
    }, (data) => {
      console.log("=== handle Update Event ===");
      console.log(data);
      console.log("=== End of handle Update Event ===");
    });

    event.preventDefault();
    props.turnOffUpdateEventForm();
    props.setNotificationTrigger(!(props.notificationTrigger));
  };

  const handleDelete = (event) => {
    api_delete_event(props.id, (data) => {
      console.log("=== handle Delete Event ===");
      console.log(data);
      console.log("=== End of handle Delete Event ===");
    });

    event.preventDefault();
    props.turnOffUpdateEventForm();
    props.setNotificationTrigger(!(props.notificationTrigger));

  };

  const handleSetToggleNotification = (event) => {
    setToggleNotification(event.target.checked);
    // if (!event.target.checked) {
    //   setNotificationTime(dayjs(new Date(props.start)));
    // }
  };

  return (
    <Container maxWidth="sm">
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12} className='d-flex justify-content-end'>
            <IconButton onClick={props.turnOffUpdateEventForm} style={{ color: 'white', backgroundColor: '#EA5B60' }}>
              <CloseIcon />
            </IconButton>
          </Grid>

          <Grid item xs={12}>
            <h1>Update New Event</h1>
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Title"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Grid>

          <Grid item xs={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Start Time"
                value={startTime}
                onChange={(newValue) => setStartTime(newValue)}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="End Time"
                value={endTime}
                onChange={(newValue) => setEndTime(newValue)}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12}>
            <div className='d-flex justify-content-center'>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={toggleNotification}
                    onChange={handleSetToggleNotification}
                  />
                }
                label="Notification:"
                labelPlacement="end"
              />

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                {toggleNotification ?
                  <DateTimePicker
                    label="Notification Time"
                    value={notificationTime}
                    onChange={(newValue) => setNotificationTime(newValue)}
                  /> :
                  <DateTimePicker
                    label="Notification Time"
                    value={notificationTime}
                    disabled
                  />
                }
              </LocalizationProvider>
            </div>
          </Grid>

          <Grid item xs={6}>
            <Button variant="contained" color="error" onClick={handleDelete} fullWidth>
              Delete
            </Button>
          </Grid>

          <Grid item xs={6}>
            <Button variant="contained" color="primary" onClick={handleUpdateEvent} fullWidth>
              Update
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
