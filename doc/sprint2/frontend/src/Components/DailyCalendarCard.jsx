/*
  Reference: I have used CHATGPT, Github Copilot  and my own knowledge to code the following file.
*/

import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, IconButton, Box } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { api_calendar_fetch } from './api';

const DailyPlanCard = () => {
    const weekDay = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November','December'];
    const [currentDay, setCurrentDay] = useState(new Date());
    const [events, setEvents] = useState([]);
    

    useEffect(() => {
        api_calendar_fetch((data) => {
            const allTodayEvents = data.filter((event) => {
                const eventDate = new Date(event.start);
                console.log(currentDay);
                return (
                    eventDate.getDate() === currentDay.getDate() &&
                    eventDate.getMonth() === currentDay.getMonth() &&
                    eventDate.getFullYear() === currentDay.getFullYear()
                );
            });

            setEvents(allTodayEvents.map((event) => ({
                id: event.id,
                title: event.title,
                start: new Date(event.start),
                end: new Date(event.end),
            })));
        });
    }, [currentDay]);

    const handlePrevDay = () => {
        setCurrentDay((prev) => new Date(prev.setDate(prev.getDate() - 1)));
    };

    const handleNextDay = () => {
        setCurrentDay((prev) => new Date(prev.setDate(prev.getDate() + 1)));
    };

    return (
        <Card sx={{ backgroundColor: '#D4D3F3', borderRadius: 10, maxWidth: '20vw' }}>
            <CardContent>
                <Typography variant="h5" component="div" align="center" sx={{fontWeight:'bold'}}>
                    DAILY PLAN
                </Typography>

                <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                    <IconButton onClick={handlePrevDay}>
                        <ArrowBackIosIcon style={{color:"white", fontSize: '3rem', fontWeight: 'bold'}}/>
                    </IconButton>
                    <Typography variant="subtitle1" component="div" sx={{ background: 'white', p: 2, borderRadius: 2 }}>
                        <p style={{margin:0}}>{weekDay[currentDay.getDay()]}</p>
                        <p style={{margin:0}}>{month[currentDay.getMonth()] + ' ' +currentDay.getDate()+ ' ' + currentDay.getFullYear() + ' '}</p>
                    </Typography>
                    <IconButton onClick={handleNextDay}>
                        <ArrowForwardIosIcon style={{color:"white",fontSize: '3rem', fontWeight: 'bold'}}/>
                    </IconButton>
                </Box>
                
                <Box mt={2} sx={{ width: "15rem", background: 'white', borderRadius: 2, p: 2, overflow: 'auto', maxHeight: '10vh', textAlign: 'center', 
                '&::-webkit-scrollbar': {
                    width: '10px',
                },
                '&::-webkit-scrollbar-track': {
                    background: '#E0E0E0',
                },
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor: '#888',
                    borderRadius: '3px',
                },
                '&::-webkit-scrollbar-thumb:hover': {
                    backgroundColor: '#555',
                }
        ,}}>
                    <ol className='d-flex flex-column align-items-start justify-content-center'>
                    
                        {events.map((event, index) => (
                            <li>
                                <Typography variant="body1" key={index}>
                                    {event.title}
                                </Typography>
                            </li>
                        ))}
                        
                    </ol>
    
                </Box>
            </CardContent>
        </Card>
    );
};

export default DailyPlanCard;
