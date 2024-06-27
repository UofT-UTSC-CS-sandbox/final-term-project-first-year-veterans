const express = require('express');
const router = express.Router();


const today = new Date();
let id = 2;
let DB = [

    {
        id: 1,
        title: 'Today’s Event',
        start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 0), // Today at 10:00 AM
        end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 11, 0), // Today at 11:00 AM
    },
    {
        id: 2,
        title: 'Tommorow’s Event',
        start: new Date(today.getFullYear(), today.getMonth(), today.getDate()+1, 10, 0), // Today at 10:00 AM
        end: new Date(today.getFullYear(), today.getMonth(), today.getDate()+1, 11, 0), // Today at 11:00 AM
    },
];

router.get('/api/events', function(req, res) {
    res.send(DB);
});

router.post('/api/AddEvents', function(req, res) {
    req.body.id = ++id;
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
    res.send(DB);

});


module.exports = router;