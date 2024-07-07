const express = require('express');
const router = express.Router();

const { getSession } = require('../neo4j');

// Middleware to parse JSON bodies
router.use(express.json());

router.post('/api/post/create/', async (req, res) => {
    console.log('Server received: POST /api/post/create/');
    let post_data = req.body;
    const ID = post_data.userID;
    const title = post_data.postTitle;
    const body = post_data.postMessage;

    const session = getSession();
    // tx is a transaction object, make sure either complete all the queries or none
    const tx = session.beginTransaction();

    // for some reason a post has a timestamp
    // note that time is in UTC for consistency
    // format is YYYY-MM-DDThh:mm:ss.mili (T is just the letter T, as a way to demarcate between date and time) as a string
    // who decided this was a good idea
    const date = new Date();
    const timestamp = date.getUTCFullYear().toString() + "-" + (date.getUTCMonth() + 1).toString().padStart(2, '0') + "-" + date.getUTCDate().toString().padStart(2, '0')
        + "T" + date.getUTCHours().toString().padStart(2, '0') + ":" + date.getUTCMinutes.toString().padStart(2, '0') + ":" + date.getUTCSeconds().toString().padStart(2, '0')
        + "." + date.getUTCMilliseconds().toString();

    try {
        let result = await tx.run(
            `
            CREATE (p:Post {title: $title, content: $content, comments_count: 0, likes: 0, pid: 0, saves: 0, timestamp: $timestamp, visibility: 'public'})
            SET p.pid = p.id;
            MATCH (u:User {uid: $uid})
            CREATE (u)-[:POSTED]->(p)
            RETURN p AS node
            `, { title: title, content: body, uid: ID, timestamp: timestamp });
        res.status(200).json({ message: 'Post Created', result: result}); //return the post created
    } catch (error) {
        await tx.rollback();
        console.error('Error creating post: ', error);
        res.status(500).json({ message: 'Internal server error' });
    } finally {
        await session.close();
    }
});

module.exports = router;