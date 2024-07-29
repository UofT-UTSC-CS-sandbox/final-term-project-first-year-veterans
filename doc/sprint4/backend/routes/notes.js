const express = require('express');
const router = express.Router();

let notes = {}; // In-memory storage for notes
let nextId = 1; // Counter to generate unique IDs for notes

// Fetch all notes
router.get('/api/get/notes', (req, res) => {
    console.log(notes);
  const notesArray = Object.values(notes);
  res.json(notesArray);
});

// Create a new note
router.post('/api/post/notes', (req, res) => {
  const { text, timestamp } = req.body;
  const newNote = { id: nextId++, text, timestamp };
  notes[newNote.id] = newNote;
  console.log('New note created:', newNote);
  res.status(201).json(newNote);
});



module.exports = router;
