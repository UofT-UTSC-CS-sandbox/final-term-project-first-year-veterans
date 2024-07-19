const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

let id = 3;
let DB = [
  { projectId: 1, userId: "Andy_Chang", projectTitle: "My First Project!", projectDescription: "This is a new project about a tictactoe game", joinedCount: 10, isJoinedByMe: 0 },
  { projectId: 2, userId: "Richie_Hsieh", projectTitle: "My First Project as well!", projectDescription: "This is a new project about a chess game in python", joinedCount: 5, isJoinedByMe: 1 }
];

router.get('/api/project/fetchall', async function (req, res) {
  console.log("Fetching all projects");
  res.status(200).json(DB);
});

router.get('/api/project/fetch/:uid', async function (req, res) {
  const { uid } = req.params;
  const userProjects = DB.filter(project => project.userId === uid);
  res.status(200).json(userProjects);
});

router.post('/api/project/create', upload.single('file'), async function (req, res) {
  console.log('Server received: POST /api/project/create');
  const { projectTitle, projectDescription, userId } = req.body;
  const file = req.file;
  const newProject = { projectId: id++, userId, projectTitle, projectDescription, joinedCount: 0, isJoinedByMe: 0 };
  if (file) {
    newProject.filePath = file.path; // Handle file path storage as needed
  }
  DB.push(newProject);
  res.status(201).json(newProject);
});

router.post('/api/project/join', async function (req, res) {
  const { projectId, uid } = req.body;
  const project = DB.find(p => p.projectId === projectId);
  if (project) {
    if (project.isJoinedByMe === 0) {
      project.joinedCount += 1;
      project.isJoinedByMe = 1;
      res.status(200).json(project);
    } else {
      project.joinedCount -= 1;
      project.isJoinedByMe = 0;
      res.status(200).json(project);
    }
  } else {
    res.status(404).json({ error: 'Project not found' });
  }
});

router.post('/api/project/edit', upload.single('file'), async function (req, res) {
  const { projectId, title, description } = req.body;
  const file = req.file;
  const project = DB.find(p => p.projectId === parseInt(projectId));

  if (project) {
    project.projectTitle = title;
    project.projectDescription = description;
    if (file) {
      project.filePath = file.path;
    }
    res.status(200).json({ success: true, project });
  } else {
    res.status(404).json({ error: 'Project not found' });
  }
});

module.exports = router;
