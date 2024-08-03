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
        MATCH (u:User {uid: $uid})-[:MEMBER_OF]->(g:Group)
        RETURN g AS group
        ORDER BY g.lastUpdateAt DESC
    `, { uid: uid })
    .then(result => {
        console.log(result.records);
        let properties = [];

        result.records.forEach(record => {
            let group = record.get('group');
            let property1 = group.properties;
            property1 = convertNeo4jTypes(property1);
            properties.push({
                creator: property1.creator,
                group_id: property1.group_id, 
                name: property1.name, 
                description: property1.description,
                lastUpdateAt: property1.lastUpdateAt,
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