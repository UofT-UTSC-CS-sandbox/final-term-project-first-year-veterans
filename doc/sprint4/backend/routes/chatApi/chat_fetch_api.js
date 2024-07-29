const express = require('express');
const router = express.Router();
const { convertNeo4jTypes } = require('../../helper_functions/neo4jTypes');

const { getSession } = require('../../neo4j');
router.use(express.json());

router.post('/api/chat/fetch', (req, res) => {
    // Access data from the request body
    console.log("Server received: POST /api/chat/fetch");
    let uid = req.body.uid;
    const session = getSession();
    // Run the Neo4j query

    session.run(`
        MATCH (u:User {uid: $uid})-[:JOINED_CHAT]->(c:Chat)<-[:JOINED_CHAT]-(f:User)-[:HAS_PROFILE]->(p:User_profile)
        RETURN f AS user, c AS chat, p AS profile
        ORDER BY c.lastMessageAt DESC
    `, { uid: uid })
    .then(result => {
        console.log(result.records);
        let properties = [];

        result.records.forEach(record => {
            let user = record.get('user');
            let chat = record.get('chat');
            let profile = record.get('profile');
            let property1 = user.properties;
            property1 = convertNeo4jTypes(property1);
            let property2 = chat.properties;
            property2 = convertNeo4jTypes(property2);
            let property3 = profile.properties;
            property3 = convertNeo4jTypes(property3);
            properties.push({
                uid: property1.uid, 
                chat_id: property2.chat_id, 
                isGroup: property2.isGroup, 
                status: "offline",   // status is hardcoded to offline
                first_name: property3.first_name, 
                last_name: property3.last_name,
            });  
        });

        console.log(properties);
        res.status(200).json({ chats: properties });
    })
    .catch(error => {
        console.error('Error fetching chat: ', error);
        res.status(500).json({ message: 'Internal server error' });
    })
    .finally(() => {
        session.close();
    });
});

module.exports = router;