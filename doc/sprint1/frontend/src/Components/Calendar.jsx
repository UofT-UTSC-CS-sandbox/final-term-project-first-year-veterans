// App.js
import React from 'react';
import { Calendar as BigCalendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

// Create an event for today
const today = new Date();
const events = [
  {
    title: 'Today’s Event',
    start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 0), // Today at 10:00 AM
    end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 11, 0), // Today at 11:00 AM
  }

];

export default function Calendar(props) {
  return (
    <BigCalendar
      localizer={localizer}
      events={events}
      views={[Views.MONTH, Views.WEEK, Views.DAY]}
      defaultView={Views.WEEK}
      {...props}
    />
  );
}
