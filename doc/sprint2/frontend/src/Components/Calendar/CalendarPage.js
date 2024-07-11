/*
  Reference: I have used CHATGPT, Github Copilot  and my own knowledge to code the following file.
*/

import React from 'react';
import { useState } from 'react';
import Calendar from './Calendar';
import DailyPlanCard from '../DailyCalendarCard';
import CreateEventForm from './CreateEventForm';
import UpdateEventForm from './UpdateEventForm';

function CalendarPage(props) {
    
    // The following hook is used to setup the content onto the calendar form.
    const [EventContent, setEventContent] = useState();
    /* 
        The following hook is used to setup the type of form to be displayed.
        If the typeOfForm is 0, then it will display the nothing.
        If the typeOfForm is 1, then it will display the CreateEventForm.
        If the typeOfForm is 2, then it will display the UpdateEventForm.
    */
    const [typeOfForm, setTypeOfForm] = useState(0);

    return (

      <div className="calendar container">

        
        <div className="row">
            
              <div className={(typeOfForm === 0)?"col-md-12":"col-md-7"}>
                  
                  <Calendar style={{height: "95vh"}} NotificationIcon={props.NotificationIcon} upadteContent={typeOfForm} setEventContent={(props) => setEventContent(props)} setTypeOfForm={(e) => {setTypeOfForm(e)
                    console.log(typeOfForm)
                  }}
                  
                  />
              </div>

              {(typeOfForm === 1)&&<div className="col-md-5 d-flex align-items-center justify-content-center">
                 
                  
                <CreateEventForm start={EventContent.start} end={EventContent.end} setNotificationIcon={() => {props.setNotificationIcon(!(props.NotificationIcon))}} turnOffCreateEventForm={() => {setTypeOfForm(0)}} />

                  
                
              </div>}

              {(typeOfForm === 2)&&<div className="col-md-5 d-flex align-items-center justify-content-center">
                 
                  
                 <UpdateEventForm id={EventContent.id}  title={EventContent.title} start={EventContent.start} end={EventContent.end}  notificationTime={EventContent.notificationTime}  setNotificationIcon={() => {props.setNotificationIcon(!(props.NotificationIcon))}} turnOffUpdateEventForm={() => {setTypeOfForm(0)}}/>
 
                   
                 
               </div>}
              
        </div>

      </div>
    );
}

export default CalendarPage;