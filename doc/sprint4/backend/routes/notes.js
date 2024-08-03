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

// Fetch notes for a specific video
router.get('/api/get/notes/:videoId', (req, res) => {
  const videoId = parseInt(req.params.videoId, 10);
  const videoNotes = Object.values(notes).filter(note => note.videoId === videoId);
  res.json(videoNotes);
});

// Create a new note
router.post('/api/post/notes', (req, res) => {
  const { text, timestamp, videoId } = req.body;
  if (!videoId) {
    return res.status(400).json({ error: 'videoId is required' });
  }
  const newNote = { id: nextId++, text, timestamp, videoId };
  notes[newNote.id] = newNote;
  console.log('New note created:', newNote);
  res.status(201).json(newNote);
});

module.exports = router;
