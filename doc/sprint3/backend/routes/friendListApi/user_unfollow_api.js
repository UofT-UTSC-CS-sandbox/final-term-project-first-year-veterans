const express = require('express');
const router = express.Router();

const { getSession } = require('../../neo4j');

// Middleware to parse JSON bodies
router.use(express.json());

router.post('/api/user/unfollow', async (req, res) => {
    // Access data from the request body
    console.log("Server received: POST /api/user/unfollow");
    let uid = req.body.uid;
    let user_uid = req.body.user_uid; 
    console.log("uid: ", uid);
    console.log("user_uid: ", user_uid);

    const session = getSession();
    // tx is a transaction object, make sure either complete all the queries or none
    const tx = session.beginTransaction();

    try {
        await tx.run(`
            MATCH (u:User {uid: $uid})-[r:FOLLOWS]->(f:User {uid: $user_uid})
            DELETE r;
        `, { uid: uid, user_uid: user_uid });

        await tx.commit();
        res.status(200).json({ message: 'Unfollow Successfully' });
    } catch (error) {
        await tx.rollback();
        console.error('Error when unfollowing user: ', error);
        res.status(500).json({ message: 'Internal server error' });
    } finally {
        await session.close();
    }
});

module.exports = router;