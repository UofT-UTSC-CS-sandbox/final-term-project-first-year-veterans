const express = require('express');
const router = express.Router();
const {convertNeo4jTypes} = require('../helper_functions/neo4jTypes');
let profiles = {
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    nationality: '',
    institution: '',
    age: 0,
    gender: '',
    major: [],
    minor: []
};

const { getSession } = require('../neo4j');

// Middleware to parse JSON bodies
router.use(express.json());

router.post('/api/profile/fetch', (req, res) => {
    // Access data from the request body
    console.log("Server received: GET /api/profile/fetch");
    let uid = req.body.uid;
    const session = getSession();
    // Run the Neo4j query

    session.run(`
        MATCH (u:User {uid: $uid}) RETURN u AS node
        UNION
        MATCH (u)-[:HAS_PROFILE]->(p:User_profile) RETURN p AS node
        UNION
        MATCH (u)-[:HAS_NATIONALITY]->(n:Nationality) RETURN n AS node
        UNION
        MATCH (u)-[:HAS_GENDER]->(g:Gender) RETURN g AS node
        UNION
        MATCH (s:Student {sid: $uid})-[:ENROLL_IN]->(i:Institution) RETURN i AS node
        UNION
        MATCH (s)-[:MAJOR_IN]->(a:Academic_disciplines) RETURN COLLECT(a) AS node
        UNION
        MATCH (s)-[:MINOR_IN]->(b:Academic_disciplines) RETURN COLLECT(b) AS node
    `, { uid: uid })
    .then(result => {
        console.log(result.records);
        let properties = [];

        result.records.forEach(record => {
            let node = record.get('node');
            if (Array.isArray(node)) {
                node = node.map(n => convertNeo4jTypes(n.properties));
                properties.push(node);
            }
            else {
                let property = node.properties;
                property = convertNeo4jTypes(property);
                properties.push(property);
            }
        });

        console.log(properties);

        profiles.email = properties[0].email;
        profiles.first_name = properties[1].first_name;
        profiles.last_name = properties[1].last_name;
        profiles.phone_number = properties[1].phone_number;
        profiles.age = properties[1].age;
        profiles.nationality = properties[2].name;
        profiles.gender = properties[3].type;
        profiles.institution = properties[4].name;
        profiles.major = properties[5].map(major => major.name);
        profiles.minor = properties[6].map(minor => minor.name);

        console.log(profiles); 
        // Resolve the promise with just the records
        res.json({profiles: profiles});
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