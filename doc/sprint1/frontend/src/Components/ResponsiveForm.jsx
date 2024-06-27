import React, { useEffect } from 'react';
import { TextField, Button, Container, Grid } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import { api_create_event } from './api';

export default function ResponsiveForm( props) {
  const {start, end} = props;
  const [title, setTitle] = React.useState('');
  const [startTime, setStartTime] = React.useState(dayjs(new Date(start)));
  const [endTime, setEndTime] = React.useState(dayjs(new Date(end)));

  const handleSubmit = (event) => {
    api_create_event({title, start: startTime, end: endTime}, (data) => {
      console.log(data);
    });

    event.preventDefault();
    // Handle form submission
    console.log('Title:', title);
    console.log('Start Time:', startTime);
    console.log('End Time:', endTime);
    props.onShowAppointmentForm();
  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Title"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>

              <DateTimePicker
                label="Start Time"
                value={startTime}
                onChange={(newValue) => setStartTime(newValue)}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>

              <DateTimePicker
                label="End Time"
                value={endTime}
                onChange={(newValue) => setEndTime(newValue)}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
