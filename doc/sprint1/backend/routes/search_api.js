const express = require('express');
const { convertNeo4jTypes } = require('../helper_functions/neo4jTypes');
const user_filter = require('../helper_functions/filter_functions/user_filter');
const post_filter = require('../helper_functions/filter_functions/post_filter');
const project_filter = require('../helper_functions/filter_functions/project_filter');
const user_major_filter = require('../helper_functions/filter_functions/user_major_filter');  
const post_project_major_filter = require('../helper_functions/filter_functions/post_project_major_filter');
const router = express.Router();
let resultList = [];

// connect to neo4j
const { driver, getSession } = require("../neo4j.js");

router.post('/api/search/', async function (req, res) {
    console.log('Server received: POST /api/search/');
    let search_data = req.body;
    const filters = search_data.filters;
    const type = search_data.type;
    console.log(search_data.query);
    console.log(filters);
    console.log(type);

    //start the neo4j session
    resultList = [];
    const session = getSession();
    let query = "MATCH (n:User) RETURN n AS node " + 
                "UNION MATCH (n:Post) RETURN n AS node " + 
                "UNION MATCH (n:Project) RETURN n AS node";
    const params = {search_words: search_data.query}; // Use params to plog in search_data.query to prevent SQL injection
    if (search_data.query != ''){

        // Write query in this way to prevent SQL injection
        query = "Match (u:User) WHERE u.uid CONTAINS $search_words RETURN u AS node" + 
                " UNION " + 
                "Match (p:Post) WHERE p.title CONTAINS $search_words OR p.content CONTAINS $search_words RETURN p AS node" + 
                " UNION " +
                "Match (r:Project) WHERE r.name CONTAINS $search_words OR r.creator CONTAINS $search_words OR r.description CONTAINS $search_words RETURN r AS node";   
    }

    try {
        let result = await session.run(query, params);
        switch (type) {
            case 'User':
                result = await user_filter(session, result);
                break;
            case 'Post', 'Filters':
                result = await post_filter(session, result);
                break;
            case 'Project':
                result = await project_filter(session, result);
                break;
            default:
                break;
        }
        if (filters.length() > 0) {
            if (type == 'User'){
                result = await user_major_filter(session, result, filters);
            }
            else {
                result = await post_project_major_filter(session, result, filters);
            }
        }
        console.log(result.records);
        result.records.forEach(record => {
            //store results of query into list
            // console.log(record.get('node').properties);
            let nodeProperties = record.get('node').properties;
            nodeProperties = convertNeo4jTypes(nodeProperties);
            resultList.push(nodeProperties);
        });
        console.log(resultList);

        res.status(200);
        res.json(resultList);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    } finally {
        await session.close();
    }
        
});

module.exports = router;