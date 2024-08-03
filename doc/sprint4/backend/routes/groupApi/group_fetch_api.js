const express = require('express');
const router = express.Router();
const { convertNeo4jTypes } = require('../../helper_functions/neo4jTypes');

const { getSession } = require('../../neo4j');
router.use(express.json());

router.post('/api/group/fetch', (req, res) => {
    // Access data from the request body
    console.log("Server received: POST /api/group/fetch");
    let uid = req.body.uid;
    const session = getSession();
    // Run the Neo4j query

    session.run(`
        MATCH (u:User {uid: $uid})-[:MEMBER_OF]->(g:Group)-[:HAS_CHAT]->(c:Chat)
        RETURN g AS group, c AS chat
        ORDER BY g.lastUpdateAt DESC
    `, { uid: uid })
    .then(result => {
        console.log(result.records);
        let properties = [];

        result.records.forEach(record => {
            let group = record.get('group');
            group = group.properties;
            group = convertNeo4jTypes(group);
            let chat = record.get('chat');
            chat = chat.properties;
            chat = convertNeo4jTypes(chat);
            properties.push({
                creator: group.creator,
                group_id: group.group_id, 
                name: group.name, 
                description: group.description,
                lastUpdateAt: group.lastUpdateAt,
                chat_id: chat.chat_id,
            });  
        });

        console.log(properties);
        res.status(200).json({ groups: properties });
    })
    .catch(error => {
        console.error('Error fetching group: ', error);
        res.status(500).json({ message: 'Internal server error' });
    })
    .finally(() => {
        session.close();
    });
});

module.exports = router;