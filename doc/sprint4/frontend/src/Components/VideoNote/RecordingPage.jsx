import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Grid, Typography, Box, Paper } from '@mui/material';
import VideoPlayer from './VideoPlayer';
import AddNoteForm from './AddNoteForm';
import NoteList from './NoteList';
import { api_fetch_notes, api_create_note, api_fetch_a_video } from '../../API/VideoNoteAPI';

function RecordingPage() {
  const { id } = useParams();
  const [notes, setNotes] = useState([]);
  const [currentTimestamp, setCurrentTimestamp] = useState(0);
  const [video, setVideo] = useState(null);

  useEffect(() => {
    api_fetch_notes(id, (data) => {
    setNotes(Object.values(data));
    console.log(data);
    });

  }, [id]);

  useEffect(() => {
    api_fetch_a_video(id, (data) => {
      setVideo(data);
    });
  }, [id]);

  const addNote = async (note) => {
    setNotes([...notes, note]);
    await api_create_note(note, (data) => {
      console.log(data);
    });
  };

  const handleProgress = (state) => {
    setCurrentTimestamp(state.playedSeconds);
  };

  return (
    <Container>
      <Typography variant="h2" gutterBottom>
        Video with Notes
      </Typography>
      <Grid container spacing={2} style={{ height: '80vh' }}>
        <Grid item xs={12} md={8} style={{ height: '100%' }}>
          {video && <VideoPlayer url={video.url} onProgress={handleProgress} />}
        </Grid>
        <Grid item xs={12} md={4} style={{ height: '100%' }}>
          <Paper style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <NoteList notes={notes} style={{ flexGrow: 1, overflowY: 'auto' }} />
            <Box style={{ padding: '10px' }}>
              <AddNoteForm addNote={addNote} timestamp={currentTimestamp} />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default RecordingPage;
