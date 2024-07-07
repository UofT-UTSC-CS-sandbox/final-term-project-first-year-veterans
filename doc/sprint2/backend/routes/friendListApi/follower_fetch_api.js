const express = require('express');
const router = express.Router();
const { convertNeo4jTypes } = require('../../helper_functions/neo4jTypes');

const { getSession } = require('../../neo4j');
router.use(express.json());



router.post('/api/follower/fetch', async (req, res) => {
    // Access data from the request body
    console.log("Server received: POST /api/follower/fetch");
    let uid = req.body.uid;
    const session = getSession();

    let followers = [];

    try {
        // followers are the users who follows you but you don't follow them
        await session.run(`
            MATCH (u:User {uid: $uid})<-[:FOLLOWS]-(u2:User)
            WHERE NOT (u)-[:FOLLOWS]->(u2)
            WITH u2
            MATCH (u2)-[:HAS_PROFILE]->(p:User_profile)
            RETURN u2, p
        `, { uid: uid })
        .then(result => {
            result.records.forEach(record => {
                let user = record.get('u2');
                user = convertNeo4jTypes(user.properties);
                console.log('user: ', user);   
                let profile = record.get('p');
                profile = convertNeo4jTypes(profile.properties);
                console.log('profile: ', profile);
                followers.push({ state: 'follower', uid: user.uid, last_name: profile.last_name, first_name: profile.first_name });
            });
        });

        // mutual are the users who follows you and you follow them
        await session.run(`
            MATCH (u:User {uid: $uid})<-[:FOLLOWS]-(u2:User)
            WHERE (u)-[:FOLLOWS]->(u2)
            WITH u2
            MATCH (u2)-[:HAS_PROFILE]->(p:User_profile)
            RETURN u2, p
        `, { uid: uid })
        .then(result => {
            result.records.forEach(record => {
                let user = record.get('u2');
                user = convertNeo4jTypes(user.properties);
                console.log('user: ', user);   
                let profile = record.get('p');
                profile = convertNeo4jTypes(profile.properties);
                console.log('profile: ', profile);
                followers.push({ state: 'mutual', uid: user.uid, last_name: profile.last_name, first_name: profile.first_name });
            });
        });
        console.log('followers: ', followers);
        res.status(200).json({ followers: followers });
    } catch (error) {
        console.error('Error when fetching followers: ', error);
        res.status(500).json({ message: 'Internal server error' });
    } finally {
        await session.close();
    }
});

module.exports = router;