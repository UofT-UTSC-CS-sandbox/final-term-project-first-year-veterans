const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const { convertNeo4jTypes } = require('../helper_functions/neo4jTypes');

// connect to neo4j
const { driver, getSession } = require("../neo4j.js");

let id = 3;
let DB = [
  { projectId: 1, userId: "Andy_Chang", projectTitle: "My First Project!", projectDescription: "This is a new project about a tictactoe game", joinedCount: 10, isJoinedByMe: 0 },
  { projectId: 2, userId: "Richie_Hsieh", projectTitle: "My First Project as well!", projectDescription: "This is a new project about a chess game in python", joinedCount: 5, isJoinedByMe: 1 }
];

router.get('/api/project/fetchall', async function (req, res) {
  console.log("Fetching all projects");

  const session = getSession();
  // tx is a transaction object, make sure either complete all the queries or none
  const tx = session.beginTransaction();

  const searcher_uid = req.body.uid; //uid of the person performing the search

  let projectsList = [];

  try {
    let result = await tx.run(
      `
      MATCH (p:Project)
      RETURN p as node
      ORDER BY id(p) DESC
      `, {});
    projectsList = [];
    result.records.forEach(record => {
      //store results of query into list
      let nodeProperties = record.get('node').properties;
      nodeProperties = convertNeo4jTypes(nodeProperties);
      projectsList.push({ projectId: nodeProperties.pid, projectTitle: nodeProperties.title, projectDescription: nodeProperties.description, joinedCount: nodeProperties.joinedCount, filePath: nodeProperties.filePath });
    });
    for (let i = 0; i < projectsList.length; i++){
      //get uid of project maker
      let result2 = await tx.run(`
        MATCH (u:User)-[:CREATED_PROJECT]->(p:Project)
        WHERE p.pid = $results
        RETURN u AS node
        `, {results: projectsList[i].projectId});
      let uid = convertNeo4jTypes(result2.records[0].get('node').properties);
      projectsList[i]["userId"] = uid.uid;
      //time to check for joined or not
      let result4 = await tx.run(`
        MATCH (u:User)-[c:JOINED]->(p:Project)
        WHERE u.uid = $uid AND p.pid = $pid
        RETURN count(c) AS number
        `, {uid: searcher_uid, pid: projectsList[i].porjectId});
      let joined = convertNeo4jTypes(result4.records[0].get('number').low);
      if (parseInt(joined) > 0) {
        projectsList[i]["isJoinedByMe"] = 1;
      }
      else {
        projectsList[i]["isJoinedByMe"] = 0;
      }
    }
    console.log(projectsList);
    res.status(200).json(projectsList); //return the projects
  } catch (error) {
    await tx.rollback();
    console.error('Error fetching projects: ', error);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    await session.close();
  }
});

router.get('/api/project/fetch/:uid', async function (req, res) {
  const { uid } = req.params; //uid of the person who made the projects we're searching for

  const session = getSession();
  // tx is a transaction object, make sure either complete all the queries or none
  const tx = session.beginTransaction();

  const searcher_uid = req.body.uid; //uid of the person performing the search

  let projectsList = [];

  try {
    let result = await tx.run(
      `
      MATCH (u:User {uid: $userId})-[:CREATED_PROJECT]->(p:Project)
      RETURN p as node
      ORDER BY id(p) DESC
      `, {userId: uid});
    projectsList = [];
    result.records.forEach(record => {
      //store results of query into list
      let nodeProperties = record.get('node').properties;
      nodeProperties = convertNeo4jTypes(nodeProperties);
      projectsList.push({ userId: uid, projectId: nodeProperties.pid, projectTitle: nodeProperties.title, projectDescription: nodeProperties.description, joinedCount: nodeProperties.joinedCount, filePath: nodeProperties.filePath });
    });
    for (let i = 0; i < projectsList.length; i++){
      //time to check for joined or not
      let result4 = await tx.run(`
        MATCH (u:User)-[c:JOINED]->(p:Project)
        WHERE u.uid = $uid AND p.pid = $pid
        RETURN count(c) AS number
        `, {uid: searcher_uid, pid: projectsList[i].porjectId});
      let joined = convertNeo4jTypes(result4.records[0].get('number').low);
      if (parseInt(joined) > 0) {
        projectsList[i]["isJoinedByMe"] = 1;
      }
      else {
        projectsList[i]["isJoinedByMe"] = 0;
      }
    }
    console.log(projectsList);
    res.status(200).json(projectsList); //return the projects
  } catch (error) {
    await tx.rollback();
    console.error('Error fetching projects: ', error);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    await session.close();
  }
});

router.post('/api/project/create', upload.single('file'), async function (req, res) {
  console.log('Server received: POST /api/project/create');
  const { projectTitle, projectDescription, userId } = req.body;
  const file = req.file;

  const session = getSession();
  // tx is a transaction object, make sure either complete all the queries or none
  const tx = session.beginTransaction();

  try {
    let result = await tx.run(
      `
      CREATE (p:Project {title: $title, description: $content, pid: 0, time_created: datetime(), joinedCount: 0, filePath: null})
      SET p.pid = id(p)
      RETURN p AS node
      `, { title: projectTitle, content: projectDescription});
    let project = convertNeo4jTypes(result.records[0].get('node').properties);
    console.log(project);
    await tx.run(
      `
      CREATE (u:User {uid: $uid})-[:CREATED_PROJECT]->(p:Project {pid: $pid})
      `,{uid: userId, pid: project.pid});
    if (file) { //handle file path storage as needed
      await tx.run(
        `
          MATCH (p:Project {pid: $pid})
          SET p.filePath = $filepath
        `
      , {pid: project.pid, filepath: file.path});
    }
    await tx.commit();
    res.status(200).json({ projectId: project.pid, userId: userId, projectTitle: projectTitle, projectDescription: projectDescription, joinedCount: 0, isJoinedByMe: 0 }); //return the project created
  } catch (error) {
      await tx.rollback();
      console.error('Error creating project: ', error);
      res.status(500).json({ message: 'Internal server error' });
  } finally {
      await session.close();
  }
});

router.post('/api/project/join', async function (req, res) {
  const { projectId, uid } = req.body;

  const session = getSession();
  // tx is a transaction object, make sure either complete all the queries or none
  const tx = session.beginTransaction();

  try {
    let result = await tx.run(
      `
      MATCH (u:User {uid: $uid})-[j:JOINED]->(p:Project {pid: $projectId})
      RETURN count(j) AS count
      `, { uid: uid, pid: projectId});
    let joined = convertNeo4jTypes(result.records[0].get('count').low);
    if (joined == 0) {
      await tx.run(
        `
        CREATE (u:User)-[:JOINED]->(p:Project)
        WHERE u.uid = $uid AND p.pid = $projectId
        `
      , {uid: uid, projectId: projectId});
      let result2 = await tx.run(
        `
        MATCH (p:Project {pid: $projectId})
        SET p.joinedCount = p.joinedCount + 1
        RETURN p AS node
        `
      , {projectId: projectId});
      let project = convertNeo4jTypes(result2.records[0].get('node').properties);
      let result3 = await tx.run(
        `
        MATCH (u:User)-[:CREATED_PROJECT]->(p:Project {pid: $projectId})
        RETURN u AS node
        `
      );
      let user = convertNeo4jTypes(result3.records[0].get('node').properties);
      await tx.commit();
      res.status(200).json({ projectId: project.pid, userId: user.uid, projectTitle: project.title, projectDescription: project.description, joinedCount: project.joinedCount, isJoinedByMe: 1 }); //return the project
    }
    else {
      await tx.run(
        `
        MATCH (u:User)-[j:JOINED]->(p:Project)
        WHERE u.uid = $uid AND p.pid = $projectId
        DELETE j
        `
      , {uid: uid, projectId: projectId});
      let result2 = await tx.run(
        `
        MATCH (p:Project {pid: $projectId})
        SET p.joinedCount = p.joinedCount - 1
        RETURN p AS node
        `
      , {projectId: projectId});
      let project = convertNeo4jTypes(result2.records[0].get('node').properties);
      let result3 = await tx.run(
        `
        MATCH (u:User)-[:CREATED_PROJECT]->(p:Project {pid: $projectId})
        RETURN u AS node
        `
      );
      let user = convertNeo4jTypes(result3.records[0].get('node').properties);
      await tx.commit();
      res.status(200).json({ projectId: project.pid, userId: user.uid, projectTitle: project.title, projectDescription: project.description, joinedCount: project.joinedCount, isJoinedByMe: 0 }); //return the project
    }
  } catch (error) {
      await tx.rollback();
      console.error('Error joining project: ', error);
      res.status(500).json({ message: 'Internal server error' });
  } finally {
      await session.close();
  }
});

router.post('/api/project/edit', upload.single('file'), async function (req, res) {
  const { projectId, title, description } = req.body;
  const file = req.file;
  const project = DB.find(p => p.projectId === parseInt(projectId));

  const session = getSession();
  // tx is a transaction object, make sure either complete all the queries or none
  const tx = session.beginTransaction();

  let path = null;
  if (file) {
    path = file.path;
  }

  try {
    //check if project exists
    let exists = await tx.run(
      `
      MATCH (p:Project {pid: $projectId})
      RETURN count(p) AS count
      `
    , {projectId: projectId});
    let exists_check = convertNeo4jTypes(exists.records[0].get('count').low);
    if (exists_check > 0) {
      let result = await tx.run(
        `
        MATCH (p:Project {pid: $projectId})
        SET p.title = $title, p.description = $content, p.filePath = $path
        RETURN p AS node
        `, { projectId: projectId, title: title, content: description, filePath: path});
      let project = convertNeo4jTypes(result.records[0].get('node').properties);;
      let result2 = await tx.run(
        `
        MATCH (u:User)-[:CREATED_PROJECT]->(p:Project {pid: $projectId})
        RETURN u AS node
        `
        );
      let user = convertNeo4jTypes(result2.records[0].get('node').properties);
      await tx.commit();
      res.status(200).json({ projectId: projectId, userId: user.uid, projectTitle: title, projectDescription: description, joinedCount: project.joinedCount, isJoinedByMe: 0 }); //return the project created
    }
    else {
      res.status(404).json({ error: 'Project not found' });
    }
  } catch (error) {
      await tx.rollback();
      console.error('Error editing project: ', error);
      res.status(500).json({ message: 'Internal server error' });
  } finally {
      await session.close();
  }
});

module.exports = router;
