const express = require('express');
const router = express.Router();
const { convertNeo4jTypes } = require('../../helper_functions/neo4jTypes');

const { getSession } = require('../../neo4j');
router.use(express.json());



router.post('/api/friendList/search', async (req, res) => {
    // Access data from the request body
    console.log("Server received: POST /api/friendList/search");
    let uid = req.body.uid;
    let label = req.body.label; // label is one of 'follower', 'friend', 'follow', 'requests'
    let prefix = req.body.prefix; 
    const session = getSession();

    let outcomes = [];
    let query1 = '';
    let query2 = '';

    switch (label) {
        case 'follower':
            query1 = `MATCH (u:User {uid: $uid})<-[:FOLLOWS]-(u2:User)
                        WHERE NOT (u)-[:FOLLOWS]->(u2)
                        WITH u2
                        MATCH (u2)-[:HAS_PROFILE]->(p:User_profile)
                        WHERE p.first_name STARTS WITH $prefix
                        RETURN u2, p`;
            query2 = `MATCH (u:User {uid: $uid})<-[:FOLLOWS]-(u2:User)
                        WHERE (u)-[:FOLLOWS]->(u2)
                        WITH u2
                        MATCH (u2)-[:HAS_PROFILE]->(p:User_profile)
                        WHERE p.first_name STARTS WITH $prefix
                        RETURN u2, p`;
            break;
        case 'friend':
            query1 = `MATCH (u:User {uid: $uid})-[:FRIENDS_WITH]->(u2:User)-[:HAS_PROFILE]->(p:User_profile)
                        WHERE p.first_name STARTS WITH $prefix
                        RETURN u2, p`;
            break;
        case 'follow':
            query1 = `MATCH (u:User {uid: $uid})-[:FOLLOWS]->(u2:User)-[:HAS_PROFILE]->(p:User_profile)
                        WHERE p.first_name STARTS WITH $prefix
                        RETURN u2, p`;
            break;
        case 'request':
            query1 = `MATCH (u:User {uid: $uid})<-[:REQUESTS_FRIENDSHIP]-(f:User)-[:HAS_PROFILE]->(p:User_profile)
                        WHERE p.first_name STARTS WITH $prefix
                        RETURN u2, p`;
            break;
    }

    try {
        // followers are the users who follows you but you don't follow them
        await session.run( query1, { uid: uid, prefix: prefix})
        .then(result => {
            result.records.forEach(record => {
                let user = record.get('u2');
                user = convertNeo4jTypes(user.properties);
                console.log('user: ', user);   
                let profile = record.get('p');
                profile = convertNeo4jTypes(profile.properties);
                console.log('profile: ', profile);
                outcomes.push({ state: label === 'follower' ? 'follower' : '', uid: user.uid, last_name: profile.last_name, first_name: profile.first_name });
            });
        });

        // mutual are the users who follows you and you follow them
        if (label === 'follower'){
            await session.run(query2, { uid: uid, prefix: prefix })
            .then(result => {
                result.records.forEach(record => {
                    let user = record.get('u2');
                    user = convertNeo4jTypes(user.properties);
                    console.log('user: ', user);   
                    let profile = record.get('p');
                    profile = convertNeo4jTypes(profile.properties);
                    console.log('profile: ', profile);
                    outcomes.push({ state: 'mutual', uid: user.uid, last_name: profile.last_name, first_name: profile.first_name });
                });
            });
        }
        console.log('outcomes: ', outcomes);
        res.status(200).json({ outcomes: outcomes });
    } catch (error) {
        console.error('Error when searching user in friendlist: ', error);
        res.status(500).json({ message: 'Internal server error' });
    } finally {
        await session.close();
    }
});

module.exports = router;