const express = require('express');
const router = express.Router();
const path = require('path');
const verifyToken = require('../../Middleware/verifyCookie');



let noteID = 2;
let notes = [

    {noteID: 1, video_id: 1, noteContent: 'This is a note', noteTimestamp: 10},
    {noteID: 2, video_id: 2, noteContent: 'This is another note', noteTimestamp: 20},

]

// Fetch all notes based on video ID

router.get('/api/videos/notes/:videoID', (req, res) => {

    console.log('Fetching all notes\n');

    const videoID = req.params.videoID;
    const videoNotes = notes.filter(note => note.video_id == videoID);  
  
    console.log(videoNotes);

    console.log('Finish fetching\n');

    res.json(videoNotes);
  });
  
  
  router.post('/api/:videoID/notes', (req, res) => {
    console.log('Creating a note\n');
    const { noteContent, noteTimestamp } = req.body;
    const videoID = req.params.videoID;
    noteID+=1;
    const note = { noteID: noteID, video_id: videoID, noteContent: noteContent, noteTimestamp: noteTimestamp };
    notes.push(note);

    console.log(note);

    console.log('Finish creation\n');
    res.json(note);
  });

  router.delete('/api/delete/note/:noteID', (req, res) => {
    console.log('Deleting a note\n'); 
    const note = notes.find(note => note.noteID == req.params.noteID);

    if (!note) {
        return res.status(404).send('Note not found');
    }

    console.log(note);

    notes = notes.filter(note => note.noteID != req.params.noteID);
    console.log('Finish deletion\n');
    res.json(note);
    }
);
  

module.exports = router;
