const express = require('express');
const router = express.Router();


const today = new Date();
let DB = [

    {
        title: 'Today’s Event',
        start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 0), // Today at 10:00 AM
        end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 11, 0), // Today at 11:00 AM
    },
    {
        title: 'Tommorow’s Event',
        start: new Date(today.getFullYear(), today.getMonth(), today.getDate()+1, 10, 0), // Today at 10:00 AM
        end: new Date(today.getFullYear(), today.getMonth(), today.getDate()+1, 11, 0), // Today at 11:00 AM
    },
];

router.get('/api/events', function(req, res) {
    res.send(DB);
});

router.post('/api/AddEvents', function(req, res) {
    DB.push(req.body);
    res.send(DB);
    }   
);

module.exports = router;