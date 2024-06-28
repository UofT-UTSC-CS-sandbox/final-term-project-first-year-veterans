import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { api_checkAuth } from './Components/api';  
import Main from './Components/Main';
import Login from './Components/login';
import Calendar from './Components/Calendar';
import CalendarForm from './Components/CalendarForm';
import TopBar from './Components/top_bar';

function App() {
    
    const [canlendar, setcanlendar] = useState();
    return (


      <div className="App container">

        
        <div class="row">
            {/* <TopBar class="col-md-12"/> */}

            {!canlendar ? 
              <div class="col-md-12">
                  <Calendar style={{height: "95vh"}} canlendar={canlendar} 

                    openCalendarForm={(canlendar) => {

                        setcanlendar(canlendar)

                      }} 
                  />
              </div>:
              <div class="col-md-7">
                <Calendar style={{height: "95vh"}} canlendar={canlendar} 
                  openCalendarForm={(canlendar) => {

                      setcanlendar(canlendar)

                    }} 
                />
            </div>
            }
            
            <div class="col-md-5 d-flex align-items-center justify-content-center">
                {canlendar && 
                <div> 
                  <CalendarForm start={canlendar.start} end={canlendar.end} title={canlendar.title} canlendar={canlendar}
                    openCalendarForm={() => {

                        setcanlendar();
                        
                    }}
                  />
                </div>}
            </div>
        </div>
            


      </div>
    );
}

export default App;
