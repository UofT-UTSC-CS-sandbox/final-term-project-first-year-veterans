const express = require('express');
const router = express.Router();

const { getSession } = require('../../neo4j');

// Middleware to parse JSON bodies
router.use(express.json());

router.post('/api/user/followback', async (req, res) => {
    // Access data from the request body
    console.log("Server received: POST /api/user/followback");
    let uid = req.body.uid;
    let user_uid = req.body.user_uid; 
    console.log("uid: ", uid);
    console.log("user_uid: ", user_uid);

    const session = getSession();
    // tx is a transaction object, make sure either complete all the queries or none
    const tx = session.beginTransaction();

    try {
        await tx.run(`
            MATCH (u:User {uid: $uid}), (f:User {uid: $user_uid})
            CREATE (u)-[:FOLLOWS]->(f)
        `, { uid: uid, user_uid: user_uid });

        await tx.commit();
        console.log('Follow back successfully');
        res.status(200).json({ message: 'Follow back successfully' });
    } catch (error) {
        await tx.rollback();
        console.error('Error when following back user: ', error);
        res.status(500).json({ message: 'Internal server error' });
    } finally {
        await session.close();
    }
});

module.exports = router;