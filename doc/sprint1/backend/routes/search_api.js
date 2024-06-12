const express = require('express');
const router = express.Router();

// connect to neo4j
//const { driver, getSession } = require("../neo4j.js");

router.post('/api/search', function (req, res) {
    console.log('Server received: POST /api/search');
    // An example of a search result
    
    //start the session
    //const session = getSession();
    //const resultList = [];
    //session.run("Placeholder Text").then(result => {
        //result.records.forEach(record => {
            //store results of query into list
            //resultList.push(record.get('placeholder name of node property'));
        //});
    //})
    
    const user = {
        id: 1,
        username: 'john_doe',
        email: 'john@example.com'
    };
    res.status(200);
    res.json(user);
});

module.exports = router;