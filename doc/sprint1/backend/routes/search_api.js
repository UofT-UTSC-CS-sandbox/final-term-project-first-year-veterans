const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
const router = express.Router();

// connect to neo4j
//const { driver, getSession } = require("../neo4j.js");

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

const users = [
    {
        id: 1,
        username: 'NotTrending1AndCrim',
        email: 'john@example.com',
        trending: false,
        major: "criminology"
    },
    {
        id: 2,
        username: 'Trending1AndStats',
        email: 'Trending1@example.com',
        trending: true,
        major: "statistics"
    },
    {
        id: 3,
        username: 'Trending2AndMath',
        email: 'Trending2@example.com',
        trending: true,
        major: "math"
    },
    {
        id: 4,
        username: 'NotTrending2AndCS',
        email: 'NotTrending@example.com',
        trending: false, // Not trending
        major: "computer_science"
    },
    {
        id: 5,
        username: 'Trending3AndCrim',
        email: 'User5@example.com',
        trending: true, // Not trending
        major: "criminology"
    }
];

router.post('/api/search/', function (req, res) {
    console.log('Server received: POST /api/search/');
    let search_data = req.body;
    const state = search_data.filters;
    console.log(search_data.query);

    if (search_data.query == 'all'){
        res.status(200);
        return res.json(users);
    }
    else if (state.length != 0){
        switch (state[0]){
            case 'trending':
                res.status(200); // Setting HTTP status code
                const trendingUsers = users.filter(user => user.trending); // Filtering trending users
                console.log(trendingUsers);
                res.json(trendingUsers); // Sending JSON response with trending users
                break;
            case 'newest':
                const newestUser = [users.reduce((max, user) => (user.id > max.id ? user : max), users[0])];
                res.status(200);
                console.log(newestUser);
                res.json(newestUser);
                break;
            case 'math':
            case 'computer_science':
            case 'statistics':
                res.status(200);
                const filteredUsers = users.filter(user => user.major === state[0]);
                console.log(filteredUsers);
                res.json(filteredUsers);
                break;
        }
    } else {
        return res.json([users]);
    }
    
});

module.exports = router;