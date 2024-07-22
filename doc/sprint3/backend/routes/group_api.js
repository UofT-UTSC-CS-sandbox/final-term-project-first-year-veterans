/*
  Reference: I have used CHATGPT, Github Copilot  and my own knowledge to code the following file.
*/

const express = require('express');
const router = express.Router();
const { getSession } = require('../neo4j');
const {convertNeo4jTypes} = require('../helper_functions/neo4jTypes');

let db = [];

router.post('/api/group/create', async (req, res) => {
    console.log(req.body); 
});



module.exports = router;