/*
  Reference: I have used CHATGPT, Github Copilot  and my own knowledge to code the following file.
*/

import React, { useEffect, useState } from 'react';
import { TextField, Button, Container, Grid, IconButton} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import { api_create_event,  api_update_event} from '../api';
import { api_delete_event } from '../api';
import CloseIcon from '@mui/icons-material/Close';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function CreateEventForm( props) {
    /* Return the form for creating a new event.
        The props will include the following attributes:
        
        - title
            -- {toggleCalendarForm.title} 

        - start
            -- {toggleCalendarForm.start} 
        
        - end
            -- {toggleCalendarForm.end} 
        
                
        - turnOffCreateEventForm=
            -- {() => { setToggleCalendarForm(); } }
    */
    
    //=== The following parts will intitialize the state of the form using hook. ===

    const [title, setTitle] = useState('');

    /*   
        The start and end time will always have a value.
        To use mui component to display the date and time, we need to convert the date to dayjs object.
        However, when we use JSON.stringify to send the data to the backend, 
        the result of applying JSON.stringify to a dayjs object and date object are the same string.
    */
    const [startTime, setStartTime] = useState(dayjs(new Date(props.start)));

    const [endTime, setEndTime] = useState(dayjs(new Date(props.end)));
    
    // Enable the notification field.
    const [toggleNotification, setToggleNotification] = useState(false);
    const [notificationTime, setNotificationTime] = useState(dayjs(new Date(props.start)));

  /*
    The following handle funtion will deal with the event creation.
    
  */
  const handleAddEvent = (event) => {
    api_create_event({title: title||'No Title', start: startTime, end: endTime, notificationTime: toggleNotification?notificationTime:null}, (data) => {
      console.log("=== handle Add Event with Notification ===");

      console.log(data);

      console.log("=== End of handle Add Event with Notification ===");
    });

    event.preventDefault();
    props.turnOffCreateEventForm();
    props.setNotificationIcon();

    //props.setToggleUpdateNotification(!(props.NotificationIcon));


  };

  const handleSetToggleNotification = (event) => {
    setToggleNotification(event.target.checked);
  };


  

  return (
    <Container maxWidth="sm">
      
      <form >

        <Grid container spacing={2}>
          
          {/* The following part is the close button inside the form. */}
          <Grid item xs={12} className='d-flex justify-content-end' >
            <IconButton onClick={props.turnOffCreateEventForm} style={{ color: 'white', backgroundColor: '#EA5B60'}}>
              <CloseIcon />
            </IconButton>
          </Grid>

          {/* The following part is for title of the form button */}
          <Grid item xs={12}>
            
            {/* The following part is Update Event if the update hook set to true. */}

            <h1>Create New Event</h1>

          </Grid>

          {/* The following part is for the title of the event. */}
          <Grid item xs={12}>
            <TextField
              label="Title"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Grid>

          {/* The following part is for the start time of the event. */}
          <Grid item xs={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>

              <DateTimePicker
                label="Start Time"
                value={startTime}
                onChange={(newValue) => setStartTime(newValue)}
              />
            </LocalizationProvider>
          </Grid>

          {/* The following part is for the end time of the event. */}
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
                    value=""
                    control={<Checkbox />}
                    label="Notification:"
                    labelPlacement="end"
                    onClick={handleSetToggleNotification}
                />
              
               <LocalizationProvider dateAdapter={AdapterDayjs}>
                    {toggleNotification?
                        <DateTimePicker
                        label="Notification Time"
                        value={notificationTime}
                        onChange={(newValue) => setNotificationTime(newValue)}
                        
                        />: 
                        <DateTimePicker
                            label="Notification Time"
                            value={notificationTime}
                            disabled
                        />
                        
                    }
                 
                </LocalizationProvider>


            </div>
            
          </Grid>




          {/* The following part is for the create or update button depending on what user wants to do on the calendar. */}
          <Grid item xs={12}>

            <Button variant="contained" color="primary"onClick={handleAddEvent}  fullWidth>

                create

            </Button>
          </Grid>

        </Grid>
      
      </form>

    </Container>
  );
}
