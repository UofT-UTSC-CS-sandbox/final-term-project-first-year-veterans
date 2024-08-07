const express = require('express');
const router = express.Router();
const { convertNeo4jTypes } = require('../../helper_functions/neo4jTypes');

const { getSession } = require('../../neo4j');
router.use(express.json());

router.post('/api/message/fetch', (req, res) => {
    // Access data from the request body
    console.log("Server received: POST /api/message/fetch");
    let uid = req.body.uid;
    console.log("uid: ", uid);
    let user = req.body.user;
    console.log("user: ", user);
    const session = getSession();
    // Run the Neo4j query

    session.run(`
        MATCH (u:User {uid: $uid})-[:JOINED_CHAT]->(c:Chat)<-[:JOINED_CHAT]-(f:User {uid: $user})
        WITH c
        MATCH (c)-[:HAS_MESSAGE]->(m:Message)
        RETURN m AS message
        ORDER BY m.time ASC
    `, { uid: uid, user: user })
    .then(result => {
        console.log(result.records);
        let properties = [];

        result.records.forEach(record => {
            let message = record.get('message');
            let property1 = message.properties;
            property1 = convertNeo4jTypes(property1);
            properties.push({
                sender: property1.sender, 
                time: property1.time,
                content: property1.content,
            });  
        });

        console.log(properties);
        res.status(200).json({ messages: properties });
    })
    .catch(error => {
        console.error('Error fetching messages: ', error);
        res.status(500).json({ message: 'Internal server error' });
    })
    .finally(() => {
        session.close();
    });
});

module.exports = router;