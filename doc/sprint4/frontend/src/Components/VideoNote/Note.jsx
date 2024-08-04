import React from 'react';
import { Box, Card, CardActionArea, CardContent, Grid, Typography } from '@mui/material';
import { Delete, Padding } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { Container } from 'react-bootstrap';

const Note = ({ note, deleteNote }) => {

  const seconds = Math.floor(note.noteTimestamp % 60).toString().padStart(2, '0');
  const minutes = Math.floor((note.noteTimestamp % 3600) / 60).toString().padStart(2, '0');
  const hours = (Math.floor(note.noteTimestamp / 3600)).toString().padStart(2, '0');
  const handleDelete = (noteID) => {
    console.log(note);
    console.log("Deleting note with noteID:", noteID); // Log the noteID to check if it's undefined
    deleteNote(noteID);
  };

  return (
    <Card variant="outlined" sx={{ mb: 2, textAlign:'left'}}>
      <CardContent display="flex" justifyContent="space-between" alignItems='center'>
        <Grid container>
          <Grid item xs={10}>
          <Typography variant="body1" sx={{ wordWrap: 'break-word' }}>
            {`${hours}:${minutes}:${seconds}`}: {note.noteContent}
          </Typography>
          </Grid>
          <Grid item xs={2}>
            <Container>
              <IconButton
                  aria-label="delete"
                  onClick={() => handleDelete(note.noteID)}
                >
                <Delete sx={{ fontSize: '1rem'}} />
              </IconButton>
            </Container>
          </Grid>
        </Grid>


      </CardContent>
    </Card>
  );
};

export default Note;
