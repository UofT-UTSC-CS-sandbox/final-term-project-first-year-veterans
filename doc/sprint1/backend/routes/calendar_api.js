const express = require('express');
const router = express.Router();
const verifyToken = require('../Middleware/verifyCookie');

const today = new Date();
let id = 2;
let DB = [

    {
        id: 1,
        title: 'Today’s Event',
        start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 0), // Today at 10:00 AM
        end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 11, 0), // Today at 11:00 AM
        notificationTime: null,
        userId: 'username'
    
    },
    {
        id: 2,
        title: 'Tommorow’s Event',
        start: new Date(today.getFullYear(), today.getMonth(), today.getDate()+1, 10, 0), // Today at 10:00 AM
        end: new Date(today.getFullYear(), today.getMonth(), today.getDate()+1, 11, 0), // Today at 11:00 AM
        notificationTime: new Date(today.getFullYear(), today.getMonth(), today.getDate()+1, 9, 0), // Today at 9
        userId: 'username1'
    },
];

router.get('/api/events',verifyToken , function(req, res) {
   
    res.send(DB.filter(event => event.userId===req.userId));
});

router.post('/api/AddEvents', function(req, res) {
    req.body.id = ++id;
    console.log(req.body);
    DB.push(req.body);
    res.send(DB);
    }   
);

router.put('/api/UpdateEvent/:eventId', (req, res) => {
    const eventId = parseInt(req.params.eventId);
    const eventIndex = DB.findIndex(event => event.id === eventId);
    DB[eventIndex].id = eventId;
    DB[eventIndex].title = req.body.title || DB[eventIndex].title;
    DB[eventIndex].start = req.body.start || DB[eventIndex].start;
    DB[eventIndex].end = req.body.end || DB[eventIndex].end;    
    DB[eventIndex].notificationTime = req.body.notificationTime;
    res.send(DB);
    console.log(DB);
});

router.delete('/api/DeleteEvent/:eventId', (req, res) => {
    const eventId = parseInt(req.params.eventId);
    DB = DB.filter(event => event.id !== eventId);
    res.send(DB);
});


module.exports = router;