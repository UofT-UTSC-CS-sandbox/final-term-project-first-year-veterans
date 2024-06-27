import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { api_checkAuth } from './Components/api';  
import Main from './Components/Main';
import Login from './Components/login';
import Calendar from './Components/Calendar';
import ResponsiveForm from './Components/ResponsiveForm';
import TopBar from './Components/top_bar';

function App() {
    
    const [appointment, setAppointment] = useState();
    return (


      <div className="App container">

        
        <div class="row">
            {/* <TopBar class="col-md-12"/> */}

            {!appointment ? 
              <div class="col-md-12">
                  <Calendar style={{height: "95vh"}} appointment={appointment} 

                    onShowAppointmentForm={(appointment) => {
                        setAppointment(appointment)
                      }} 
                  />
              </div>:
              <div class="col-md-7">
                <Calendar style={{height: "95vh"}} appointment={appointment} 
                  onShowAppointmentForm={(appointment) => {
                      setAppointment(appointment)
                    }} 
                />
            </div>
            }
            
            <div class="col-md-5 d-flex align-items-center justify-content-center">
                {appointment && 
                <div> 
                  <ResponsiveForm start={appointment.start} end={appointment.end} title={appointment.title} appointment={appointment}
                    onShowAppointmentForm={() => {
                        setAppointment();
                    }}
                  />
                </div>}
            </div>
        </div>
            


      </div>
    );
}

export default App;
