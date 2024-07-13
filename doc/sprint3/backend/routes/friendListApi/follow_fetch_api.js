const express = require('express');
const router = express.Router();
const { convertNeo4jTypes } = require('../../helper_functions/neo4jTypes');

const { getSession } = require('../../neo4j');
router.use(express.json());

router.post('/api/follow/fetch', (req, res) => {
    // Access data from the request body
    console.log("Server received: POST /api/follow/fetch");
    let uid = req.body.uid;
    const session = getSession();
    // Run the Neo4j query

    session.run(`
        MATCH (u:User {uid: $uid})-[:FOLLOWS]->(f:User)-[:HAS_PROFILE]->(p:User_profile)
        RETURN f AS node, p AS profile 
    `, { uid: uid })
    .then(result => {
        console.log(result.records);
        let properties = [];

        result.records.forEach(record => {
            let node = record.get('node');
            let profile = record.get('profile');
            let property1 = node.properties;
            property1 = convertNeo4jTypes(property1);
            let property2 = profile.properties;
            properties.push({uid: property1.uid, last_name: property2.last_name, first_name: property2.first_name});  // uid, last_name, first_name
        });

        console.log(properties);
        res.status(200).json({ follows: properties });
    })
    .catch(error => {
        console.error('Error querying Neo4j', error);
        res.status(500).json({ message: 'Internal server error' });
    })
    .finally(() => {
        session.close();
    });
});

module.exports = router;