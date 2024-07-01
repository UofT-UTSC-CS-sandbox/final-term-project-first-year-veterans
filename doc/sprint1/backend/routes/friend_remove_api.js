const express = require('express');
const router = express.Router();

const { getSession } = require('../neo4j');

// Middleware to parse JSON bodies
router.use(express.json());

router.post('/api/friend/remove', async (req, res) => {
    // Access data from the request body
    console.log("Server received: POST /api/friend/remove");
    let uid = req.body.uid;
    let friend_uid = req.body.friend_uid; 
    console.log("uid: ", uid);
    console.log("friend_uid: ", friend_uid);

    const session = getSession();
    // tx is a transaction object, make sure either complete all the queries or none
    const tx = session.beginTransaction();

    try {
        await tx.run(`
            MATCH (u:User {uid: $uid})-[r:FRIENDS_WITH]->(f:User {uid: $friend_uid})
            DELETE r;
        `, { uid: uid, friend_uid: friend_uid });

        await tx.run(`
            MATCH (u:User {uid: $uid})<-[r:FRIENDS_WITH]-(f:User {uid: $friend_uid})
            DELETE r;
        `, { uid: uid, friend_uid: friend_uid });

        await tx.commit();
        res.status(200).json({ message: 'Unfriend Successfully' });
    } catch (error) {
        await tx.rollback();
        console.error('Error removing friend: ', error);
        res.status(500).json({ message: 'Internal server error' });
    } finally {
        await session.close();
    }
});

module.exports = router;