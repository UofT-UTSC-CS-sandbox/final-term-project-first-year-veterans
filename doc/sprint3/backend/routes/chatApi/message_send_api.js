const express = require('express');
const router = express.Router();
const { convertNeo4jTypes } = require('../../helper_functions/neo4jTypes');

const { getSession } = require('../../neo4j');
router.use(express.json());

router.post('/api/message/send', async (req, res) => {
    // Access data from the request body
    console.log("Server received: POST /api/message/send");
    let sender = req.body.sender;
    let chat_id = req.body.chat_id;
    let content = req.body.content;
    
    const session = getSession();

    // tx is a transaction object, make sure either complete all the queries or none
    const tx = session.beginTransaction();

    try {
        await tx.run(`
            CREATE (m:Message {sender: $sender, content: $content, time: datetime()})
            WITH m
            MATCH (c:Chat {chat_id: $chat_id}), (u:User {uid: $sender})
            CREATE (u)-[:SENT]->(m)<-[:HAS_MESSAGE]-(c)
            WITH c
            SET c.lastMessageAt = datetime()
        `, { sender: sender, chat_id: chat_id, content: content });

        await tx.commit();
        res.status(200).json({ message: 'Message sent' });
    } catch (error) {
        await tx.rollback();
        console.error('Error sending message: ', error);
        res.status(500).json({ message: 'Internal server error' });
    } finally {
        await session.close();
    }
});

module.exports = router;