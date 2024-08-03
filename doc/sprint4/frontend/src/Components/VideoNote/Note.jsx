import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const Note = ({ note }) => {
  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="body1">
          {note.timestamp.toFixed(2)}: {note.content}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Note;
