import React from 'react';
import ReactPlayer from 'react-player';
import { Card } from '@mui/material';

const VideoPlayer = ({ url, onProgress }) => {
  return (
    <Card style={{ height: '100%' }}>
      <ReactPlayer
        url={url}
        controls
        width='100%'
        height='100%'
        onProgress={onProgress}
      />
    </Card>
  );
};

export default VideoPlayer;
