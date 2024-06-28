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

  // Events is list of activities for the current user.
  const [events, setEvents] = useState([]);

  // useEffect will re-render if there is an change in the contents of canlendar.
  useEffect(() => {
    
      // This API will fetch the lists of event
      api_calendar_fetch((data) => {

      // Need to turn all the datetime from string into Date object and update all the events.
      setEvents(data.map((event) => ({
        id: event.id,
        title: event.title,
        start: new Date(event.start),
        end: new Date(event.end),
      })));
    });
  
  }, [props.canlendar]);

  return (
    <BigCalendar
      {...props}

      // Customize the remaining props.

      localizer={localizer}
      views={[Views.MONTH, Views.WEEK, Views.DAY]}
      defaultView={Views.WEEK}
      events={events}
      selectable
      
      // If user click on an empty time slot, it will show the form to let user create a new event.

      onSelectSlot={({start, end}) => {
      
        props.openCalendarForm({start, end});
      
      }}

      // If user double click an exist event, it will show the form to let user update the event.
      onDoubleClickEvent={(event) => {

        props.openCalendarForm(event);

      }}

    
    />
  );
}
