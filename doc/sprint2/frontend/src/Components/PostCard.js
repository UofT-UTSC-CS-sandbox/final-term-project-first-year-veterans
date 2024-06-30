import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const PostCard = ({ post }) => {
  return (
    <Card style={{ margin: '20px', padding: '10px' }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {post.postTitle}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {post.postMessage}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PostCard;
