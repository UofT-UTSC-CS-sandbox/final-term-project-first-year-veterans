import React from 'react';
import Note from './Note';
import { Box, Typography } from '@mui/material';

const NoteList = ({ notes, deleteNote }) => {
    console.log(notes);
  return (
    <Box sx={{ overflowY: 'auto', flexGrow: 1, p: 2 }}>
      <Typography variant="h6" gutterBottom>
      Notes
      </Typography>
      {notes.map((note, index) => (
        <Note key={index} note={note} deleteNote={(noteID) => {
          console.log("NoteList deleteNote called with noteID:", noteID); // Log the noteID here as well
          deleteNote(noteID);
        }} />
      ))}
    </Box>
  );
};

export default NoteList;
