import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const AddNoteForm = ({ addNote, timestamp }) => {
  const [noteText, setNoteText] = useState('');
  let hours = Math.floor(timestamp / 3600);
  let minutes = Math.floor((timestamp % 3600) / 60);
  let seconds = Math.floor(timestamp % 60);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newNote = { content: noteText, timestamp };
    addNote(newNote);
    setNoteText('');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 2 }}>
      <TextField
        label="New Note"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        value={noteText}
        onChange={(e) => setNoteText(e.target.value)}
        placeholder={`[${hours.toString().padStart(2, 0)}:${minutes.toString().padStart(2, 0)}:${seconds.toString().padStart(2, 0)}] Add a note`}
        sx={{
          mb: 2,
          '& .MuiInputBase-input': {
            whiteSpace: 'pre-wrap', // Ensure new lines are respected
            overflowY: 'auto',      // Allow vertical scrolling
            wordBreak: 'break-word' // Break long words
          }
        }}
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Create New Note
      </Button>
    </Box>
  );
};

export default AddNoteForm;
