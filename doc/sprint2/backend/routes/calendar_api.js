/*
  Reference: I have used CHATGPT, Github Copilot  and my own knowledge to code the following file.
*/

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

router.get('/api/events' , function(req, res) {
   
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

router.put('/api/UpdateEvent/:eventId', async (req, res) => {
    const eventId = req.params.eventId;
    console.log("EVENTID: " + eventId);
    let entry = null;
    const session = getSession();
    try {
        const result1 = await session.run(
            `
            MATCH (e:Entry {id:$id})
            RETURN e
            `, {id: eventId}
        );
        let first_record = result1.records[0];
        if (first_record) {
            entry = first_record.get('e').properties;
        } else {
            console.error('Error with first query', error);
            res.status(500).json({ message: 'Could not find entry with specified ID' });
        }
        let newTitle = req.body.title || entry.title;
        let newStart = req.body.start || entry.start;
        let newEnd = req.body.end || entry.end;
        let newNotificationTime = req.body.notificationTime;
        if (newNotificationTime == null) {
            newNotificationTime = "null";
        }
        await session.run(
            `
            MATCH (e:Entry {id: $id})
            SET e.title = $newTitle, e.start = $newStart, e.end = $newEnd, e.notify_time = $newNotyTime
            `
            , {id: eventId, newTitle: newTitle, newStart: newStart, newEnd: newEnd, newNotyTime: newNotificationTime}
        );

        const result2 = await session.run(
            `
            MATCH (c: Calendar{cid: $cid})-[:INCLUDES]->(e:Entry)
            return e
            `, { cid: "Richie_Hsieh"}
        );
        let entries = [];
        result2.records.forEach(record => {
            let n = record.get('e').properties;
            n = convertNeo4jTypes(n);
            if (n.notify_time == "null") {
                n.notify_time = null;
            }
            let reordered_properties = {id: parseInt(n.id, 10) , title: n.title, start: n.start, end: n.end, notificationTime: n.notify_time};
            entries.push(reordered_properties); 
        });
        res.json(entries);
    } catch (error) {
        console.error('General error', error);
    } finally {
        await session.close();
    }
});

router.delete('/api/DeleteEvent/:eventId', async (req, res) => {
    const eventId = req.params.eventId;
    const session = getSession();
    try {
        await session.run(
            `
            MATCH (:Calendar)-[r:INCLUDES]->(e:Entry {id:$id})
            DELETE r,e
            `, {id: eventId}
        );
        const result1 = await session.run(
            `
            MATCH (c: Calendar{cid: $cid})-[:INCLUDES]->(e:Entry)
            return e
            `, { cid: "Richie_Hsieh"}
        );
        let entries = [];
        result1.records.forEach(record => {
            let n = record.get('e').properties;
            n = convertNeo4jTypes(n);
            if (n.notify_time == "null") {
                n.notify_time = null;
            }
            let reordered_properties = {id: parseInt(n.id, 10) , title: n.title, start: n.start, end: n.end, notificationTime: n.notify_time};
            entries.push(reordered_properties); 
        });
        res.json(entries);
    } catch (error) {
        console.error('Error processing queries:', error);
    } finally {
        await session.close(); // Close the session after all operations
    }
});

module.exports = router;