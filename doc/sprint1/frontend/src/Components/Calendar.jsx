// App.js
import React from 'react';
import { Calendar as BigCalendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { api_calendar_fetch } from './api';
import { useEffect } from 'react';
import { useState } from 'react';

const localizer = momentLocalizer(moment);

export default function Calendar(props) {

  
  const [events, setEvents] = useState([]);

  useEffect(() => {
    api_calendar_fetch((data) => {
      setEvents(data.map((event) => ({
        title: event.title,
        start: new Date(event.start),
        end: new Date(event.end),
      })));
    });
  }, [props.appointment]);

  return (
    <BigCalendar
      localizer={localizer}
      views={[Views.MONTH, Views.WEEK, Views.DAY]}
      defaultView={Views.WEEK}
      events={events}
      selectable
      onSelectSlot={({start, end}) => {
        props.onShowAppointmentForm({start, end});
      }}
      {...props}
    />
  );
}
