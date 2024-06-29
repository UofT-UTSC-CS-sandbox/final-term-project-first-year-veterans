import React from 'react';
import { useState } from 'react';
import Calendar from './Calendar';
import CalendarForm from './CalendarForm';
import DailyPlanCard from '../DailyCalendarCard';

function CalendarPage({uid}) {
    
    const [toggleCalendarForm, setToggleCalendarForm] = useState();
    return (

      <div className="calendar container">

        
        <div className="row">
            {/* <TopBar className="col-md-12"/> */}
            {!toggleCalendarForm ? 
              <div className="col-md-12">
                  <Calendar style={{height: "95vh"}} toggleCalendarForm={toggleCalendarForm} 

                    openCalendarForm={(toggleCalendarForm) => {

                        setToggleCalendarForm(toggleCalendarForm)

                      }} 
                  />
              </div>:
              
              <div className="col-md-7">
                <Calendar style={{height: "95vh"}} toggleCalendarForm={toggleCalendarForm} 
                  
                  openCalendarForm={(toggleCalendarForm) => {

                      setToggleCalendarForm(toggleCalendarForm)

                    }} 
                />
              </div>
            }
            
            <div className="col-md-5 d-flex align-items-center justify-content-center">
                {toggleCalendarForm && 
                  <div> 
                    <CalendarForm start={toggleCalendarForm.start} end={toggleCalendarForm.end} title={toggleCalendarForm.title} toggleCalendarForm={toggleCalendarForm}
                      
                      turnOffCalendarForm={() => {

                          setToggleCalendarForm();
                          
                      }}
                   
                    />
                  </div>
                }
            </div>
        </div>

      </div>
    );
}

export default CalendarPage;