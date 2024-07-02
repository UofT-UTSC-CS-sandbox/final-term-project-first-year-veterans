import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import Tooltip from '@mui/material/Tooltip';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { api_update_post_like, api_add_new_comment, api_fetch_comments } from './api';

const PostCard = ({ post }) => {
  const [likeCount, setLikeCount] = useState(0);
  const [isClicked, setIsClicked] = useState(false);
  const [isCommentDialogOpen, setIsCommentDialogOpen] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    setLikeCount(post.likeCount);
    const clickedState = localStorage.getItem(`post_${post.postid}_clicked`);
    setIsClicked(clickedState === 'true');
  }, [post]);

  const handleLike = () => {
    const newLikeCount = isClicked ? likeCount - 1 : likeCount + 1;
    api_update_post_like(post.postid, newLikeCount, (updatedPost) => {
      if (updatedPost) {
        setLikeCount(updatedPost.likeCount);
        setIsClicked(!isClicked);
        localStorage.setItem(`post_${post.postid}_clicked`, !isClicked);
      }
    });
  };

  const handleCommentClick = () => {
    setIsCommentDialogOpen(true);
    api_fetch_comments(post.postid, (fetchedComments) => {
      setComments(fetchedComments);
    });
  };

  const handleCloseCommentDialog = () => {
    setIsCommentDialogOpen(false);
  };

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleSubmitComment = () => {
    if (newComment.trim() !== '') {
      api_add_new_comment(post.postid, newComment, (updatedPost) => {
        if (updatedPost) {
          setComments(updatedPost.comments);
        }
      });
      setNewComment('');
    }
  };

  return (
    <Card style={{ margin: '20px', padding: '10px' }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {post.postTitle}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {post.postMessage}
        </Typography>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
          <Tooltip title="Like">
            <IconButton onClick={handleLike} style={{ color: isClicked ? '#3f51b5' : 'gray' }}>
              <ThumbUpIcon />
            </IconButton>
          </Tooltip>
          <Typography variant="body2" color="text.secondary" style={{ marginRight: '16px' }}>
            {likeCount}
          </Typography>
          <Tooltip title="Comment">
            <IconButton color="primary" onClick={handleCommentClick}>
              <CommentIcon />
            </IconButton>
          </Tooltip>
        </div>
      </CardContent>

      <Dialog open={isCommentDialogOpen} onClose={handleCloseCommentDialog}>
        <DialogTitle>Comments</DialogTitle>
        <DialogContent>
          <div>
            {comments.map((comment, index) => (
              <Typography key={index} variant="body2" color="text.secondary">
                {comment}
              </Typography>
            ))}
          </div>
          <TextField
            autoFocus
            margin="dense"
            id="new-comment"
            label="Add a comment"
            type="text"
            fullWidth
            variant="outlined"
            value={newComment}
            onChange={handleCommentChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCommentDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmitComment} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default PostCard;
