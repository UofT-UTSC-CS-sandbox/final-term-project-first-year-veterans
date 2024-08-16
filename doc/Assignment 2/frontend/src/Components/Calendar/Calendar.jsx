/*
  Reference: I have used CHATGPT, Github Copilot  and my own knowledge to code the following file.
*/

// App.js
import React from 'react';
import { Calendar as BigCalendar, momentLocalizer, Views } from 'react-big-calendar';
import moment, { updateLocale } from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { api_calendar_fetch } from '../../API/CalendarAPI.jsx';
import { useEffect } from 'react';
import { useState } from 'react';

const localizer = momentLocalizer(moment);

export default function Calendar(props) {
  
  /*
    The following are the properties that inside the props.

      - A value: upadteContent

      - A function: setEventContent

      - A function: setTypeOfForm

  */

  

  // Events is list of activities for the current user.
  const [events, setEvents] = useState([]);

  // useEffect will re-render if there is an change in the contents of toggleCalendarForm.
  useEffect(() => {
    
      // This API will fetch the lists of event
      api_calendar_fetch((data) => 
        {
          console.log(data);
          // Need to turn all the datetime from string into Date object and update all the events.
          setEvents(
                    data.map(
                              (event) =>(
                                          {
                                          id: event.id,
                                          title: event.title,
                                          start: new Date(event.start),
                                          end: new Date(event.end),
                                          notificationTime: (null === event.notificationTime) ? null : new Date(event.notificationTime),
                                          }
                                        )
                            )
                    );
        }
      );
  
  }, [props.upadteContent]);

  
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

      onSelectSlot={(e) => {
        console.log("Inisde onSelectSlot");
        props.setNotificationTrigger(!props.notificationTrigger);
        console.log(e);
        props.setEventContent({start:e.start, end:e.end});
        props.setTypeOfForm(1);
      }}

      // If user double click an exist event, it will show the form to let user update the event.
      onDoubleClickEvent={(e) => {
        console.log("Inisde onDoubleClickEvent");
        props.setNotificationTrigger(!props.notificationTrigger);
        console.log(e);
        props.setEventContent({id: e.id, title: e.title, start: e.start, end: e.end, notificationTime: e.notificationTime});
        props.setTypeOfForm(2);
   


      }}

    
    />
  );
}
