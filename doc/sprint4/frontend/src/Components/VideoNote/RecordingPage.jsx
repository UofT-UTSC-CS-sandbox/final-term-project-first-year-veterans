// RecordingPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Grid, Typography, Box, Paper } from '@mui/material';
import VideoPlayer from './VideoPlayer';
import AddNoteForm from './AddNoteForm';
import NoteList from './NoteList';
import { api_fetch_notes, api_create_note, api_fetch_a_video, api_delete_note } from '../../API/VideoNoteAPI';
import { Button } from 'react-bootstrap';

function RecordingPage() {
  const { id } = useParams();
  const videoID = id;
  const [notes, setNotes] = useState([]);
  const [currentTimestamp, setCurrentTimestamp] = useState(0);
  const [video, setVideo] = useState([]);

  useEffect(() => {

    console.log('====== Fetch notes into RecordingPage  ======');

    api_fetch_notes(videoID, (notesData) => {

      setNotes(Object.values(notesData).sort((a, b) => a.noteTimestamp - b.noteTimestamp));

    });
    console.log(notes);


    console.log('====== Finish fetch notes into RecordingPage  ======');
  }, [videoID]);

  useEffect(() => {

    console.log('====== Fetch a video into RecordingPage  ======');

    api_fetch_a_video(videoID, (videoData) => {

      
      setVideo(...videoData);
    });

    console.log(video);


    console.log('====== Finish fetch a video into RecordingPage  ======');
  }, [videoID]);

  const addNote = async (note) => {

    await api_create_note(videoID, note, (data) => {
      
      console.log(data);

    }
  
  );
    // Refetch notes after adding
    api_fetch_notes(videoID, (data) => {
      setNotes(Object.values(data).sort((a, b) => a.noteTimestamp - b.noteTimestamp));
    });
  };

  const deleteNote = async (noteID) => {
    await api_delete_note(noteID, (data) => {
      console.log(`Data from delete note: ${data}`);
    });
    // Refetch notes after deleting
    api_fetch_notes(videoID, (data) => {
      setNotes(Object.values(data).sort((a, b) => a.noteTimestamp - b.noteTimestamp));
    });
  };

  const handleProgress = (state) => {
    console.log(state);
    setCurrentTimestamp(state.playedSeconds);
  };

  return (
    <Container>
      <Box display="flex" justifyContent="flex-start" mb={2}>
        <Button href={`/main/videos/`} variant="primary">Back to Videos Page</Button>
      </Box>
      <Typography variant="h2" gutterBottom sx={{ marginBottom: '3rem', wordWrap: 'break-word' }}>
        {video && video.videoTitle}
      </Typography>
      
      <Grid container spacing={2} style={{ height: '60vh' }}>
        <Grid item xs={12} md={8} style={{ height: '100%' }}>
          {video && <VideoPlayer title={video.videoTitle} url={video.videoURL} onProgress={handleProgress} />}
        </Grid>
        <Grid item xs={12} md={4} style={{ height: '100%' }}>
          <Paper style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <NoteList notes={notes} deleteNote={deleteNote} style={{ flexGrow: 1, overflowY: 'auto' }} />
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
