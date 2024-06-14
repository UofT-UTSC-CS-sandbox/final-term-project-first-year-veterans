const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
router.use(bodyParser.json());

const { getSession } = require('../neo4j');

// Middleware to parse JSON bodies
router.use(express.json());

router.get('/api/profile', (req, res) => {
  // Access data from the request body
  let userName = req.body.name;
  userName = 'Richie_Hsieh';
  const session = getSession();
    // Run the Neo4j query
  session.run("MATCH (u:User {uid: $userName})-[:HAS_PROFILE]->(profile:User_profile) MATCH (u)-[:IS_STUDENT]->(studentNode)-[:ENROLL_IN]->(institution:Institution) RETURN u, profile, institution", { userName: userName })
  .then(result => {
        const record1 = result.records[0].get('u');
        const record2 = result.records[0].get('profile')
        const record3 = result.records[0].get('institution');
        // Resolve the promise with just the records
        res.json({
          user: record1.properties,
          profile: record2.properties,
          institution: record3.properties
        });
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