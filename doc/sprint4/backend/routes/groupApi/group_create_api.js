const express = require('express');
const router = express.Router();
const { convertNeo4jTypes } = require('../../helper_functions/neo4jTypes');
const { generateRandomID } = require('../../helper_functions/randomGroupId');

const { getSession } = require('../../neo4j');
router.use(express.json());

router.post('/api/group/create', async (req, res) => {
    // Access data from the request body
    console.log("Server received: POST /api/group/create");
    let name = req.body.name;
    let max = req.body.max;
    let description = req.body.description;
    let creator = req.body.creator;
    
    const session = getSession();

    // tx is a transaction object, make sure either complete all the queries or none
    const tx = session.beginTransaction();

    let group_id = generateRandomID(9); // Generate a random group ID with 9 characters
    let chat_id = generateRandomID(10); // Generate a random chat ID with 10 characters

    try {
        // Create a group
        await tx.run(`
            CREATE (g: Group {creator: $creator, group_id: $group_id, name: $name, description: $description, lastUpdateAt: datetime(), createAt: datetime()})
            WITH g
            MATCH (u:User {uid: $creator})
            CREATE (u)-[:ESTABLISH]->(g)<-[:MEMBER_OF {role: 'creator'}]-(u)
        `, { creator: creator, group_id: group_id, name: name, description: description });

        // Create a chat for the group
        await tx.run(`
            CREATE (c:Chat {chat_id: $chat_id, lastUpdateAt: datetime(), lastMessageAt: datetime(), isGroup: true})
            WITH c
            MATCH (g:Group {group_id: $group_id})
            CREATE (g)-[:HAS_CHAT]->(c)
        `, { group_id: group_id, chat_id: chat_id });

        await tx.commit();
        res.status(200).json({ 
            message: 'Group Created',
            newGroup: {
                creator: creator,
                group_id: group_id,
                name: name,
                description: description,
                lastUpdateAt: new Date().toISOString(),
            }
        });
    } catch (error) {
        await tx.rollback();
        console.error('Error creating group: ', error);
        res.status(500).json({ message: 'Internal server error' });
    } finally {
        await session.close();
    }
});

module.exports = router;