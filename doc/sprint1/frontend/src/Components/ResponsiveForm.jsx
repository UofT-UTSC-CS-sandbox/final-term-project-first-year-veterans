import React, { useEffect } from 'react';
import { TextField, Button, Container, Grid, IconButton} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import { api_create_event,  api_update_event} from './api';
import { api_delete_event } from './api';
import CloseIcon from '@mui/icons-material/Close';


export default function ResponsiveForm( props) {
  let update = false;
  if (props.title){
    update = true;
    
  }
  const t = update?props.title:'';
  const {start, end} = props;
  const [title, setTitle] = React.useState(t);
  const [startTime, setStartTime] = React.useState(dayjs(new Date(start)));
  const [endTime, setEndTime] = React.useState(dayjs(new Date(end)));

  const handleAddEvent = (event) => {
    api_create_event({title: title, start: startTime, end: endTime}, (data) => {
      console.log(data);
    });

    event.preventDefault();
    props.onShowAppointmentForm();
  };
  const handleUpdateEvent = (event) => {
    console.log(props.appointment.id);
    console.log(title);
    api_update_event(props.appointment.id, {title: title, start: startTime, end: endTime}, (data) => {
      console.log(data);
      }
    );
    event.preventDefault();
    props.onShowAppointmentForm();
  };

  const handleDelete = (event) => {
    console.log(props.appointment.id);
    api_delete_event(props.appointment.id, (data) => {
      console.log(data);
      }
    );
    event.preventDefault();
    props.onShowAppointmentForm();
  }

  

  return (
    <Container maxWidth="sm">
      <form onSubmit={update?handleUpdateEvent:handleAddEvent}>

        <Grid container spacing={2}>
          <Grid item xs={12} className='d-flex justify-content-end' >
            <IconButton onClick={props.onShowAppointmentForm} style={{ color: 'white', backgroundColor: '#EA5B60'}}>
              <CloseIcon />
            </IconButton>
          </Grid>
          <Grid item xs={12}>
            {update?<h1>Update New Event</h1>:<h1>Create New Event</h1>}
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
          {update?<Grid item xs={6}>
            <Button  variant="contained" color="error" onClick={handleDelete} fullWidth>
              Delete
            </Button>
          </Grid>:null}
          <Grid item xs={update?6:12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
