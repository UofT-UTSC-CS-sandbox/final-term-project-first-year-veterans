/*
  Reference: I have used CHATGPT, Github Copilot  and my own knowledge to code the following file.
*/

const express = require('express');
const router = express.Router();
const { getSession } = require('../neo4j');
const {convertNeo4jTypes} = require('../helper_functions/neo4jTypes');

router.get('/api/events', function(req, res) {
    const session = getSession();
    session.run(`
        MATCH (c: Calendar{cid: $cid})-[:INCLUDES]->(e:Entry)
        return e
    `, { cid: "Richie_Hsieh"})
    .then(result => {
        let entries = [];
        result.records.forEach(record => {
            let n = record.get('e').properties;
            n = convertNeo4jTypes(n);
            if (n.notify_time == "null") {
                n.notify_time = null;
            }
            let reordered_properties = {id: parseInt(n.id, 10) , title: n.title, start: n.start, end: n.end, notificationTime: n.notify_time};
            entries.push(reordered_properties); 
        });
        res.json(entries);
    })
    .catch(error => {
        console.error('Error querying Neo4j', error);
        res.status(500).json({ message: 'Internal server error' });
    })
    .finally(() => {
        session.close();
    });
});

let entry_with_highest_ID = 0;
router.post('/api/AddEvents', async (req, res) => {
    const session = getSession();
    try {
        const result1 = await session.run(
        `
        MATCH (e:Entry)
        RETURN e
        ORDER BY toInteger(e.id) DESC
        LIMIT 1
        `);
        let first_record = result1.records[0];
        if (first_record) {
            entry_with_highest_ID = first_record.get('e').properties.id;
            entry_with_highest_ID = parseInt(entry_with_highest_ID,10) + 1;
        }
        if (req.body.notificationTime == null) {
            req.body.notificationTime = "null";
        }
        await session.run(
        `
        MATCH (c: Calendar{cid: $cid})
        CREATE (e: Entry {title: $title, start: $start, end: $end, notify_time: $notify_time, id: $id})
        CREATE (c)-[:INCLUDES]->(e)
        `, { cid: "Richie_Hsieh", title: req.body.title, start: req.body.start, end: req.body.end, notify_time: req.body.notificationTime, id: String(entry_with_highest_ID)});
        
        const result3 = await session.run(
        `
        MATCH (c: Calendar{cid: $cid})-[:INCLUDES]->(e:Entry)
        return e
        `, { cid: "Richie_Hsieh"});
        let entries = [];
        result3.records.forEach(record => {
            let n = record.get('e').properties;
            n = convertNeo4jTypes(n);
            if (n.notify_time == "null") {
                n.notify_time = null;
            }
            let reordered_properties = {id: parseInt(n.id, 10) , title: n.title, start: n.start, end: n.end, notificationTime: n.notify_time};
            entries.push(reordered_properties); 
        });
        console.log(entries);
        res.json(entries)
    } catch (error) {
        console.error('Error processing queries:', error);
    } finally {
        session.close();
    }
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