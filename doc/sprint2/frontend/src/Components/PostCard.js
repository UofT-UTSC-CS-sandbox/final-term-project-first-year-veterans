import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import Tooltip from '@mui/material/Tooltip';
import Collapse from '@mui/material/Collapse';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { api_update_post_like, api_add_new_comment, api_fetch_comments, api_handle_expand_post } from './api';

const PostCard = ({ post }) => {
  const [likeCount, setLikeCount] = useState(post.likeCount);
  const [isClicked, setIsClicked] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    setIsClicked(false);
  }, [post.postid]);

  const handleLike = (event) => {
    event.stopPropagation();
    const newLikeCount = isClicked ? likeCount - 1 : likeCount + 1;
    api_update_post_like(post.postid, newLikeCount, (updatedPost) => {
      if (updatedPost) {
        setLikeCount(updatedPost.likeCount);
        setIsClicked(!isClicked);
      }
    });
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      api_fetch_comments(post.postid, (fetchedComments) => {
        setComments(fetchedComments);
      });
    }
  };

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleSubmitComment = () => {
    if (newComment.trim() !== '') {
      const commentData = {
        userId: "current_user_id", // Replace with actual user ID
        comment: newComment,
        postIdentification: post.postid
      };

      api_add_new_comment(commentData, (error, updatedPost) => {
        if (error) {
          console.error('Error adding comment:', error);
        } else {
          api_fetch_comments(post.postid, (fetchedComments) => {
            setComments(fetchedComments);
            setNewComment(''); // Clear the input field
          });
        }
      });
    }
  };

  const handleExpandPost = () => {
    api_handle_expand_post(post.postid);
  };

  return (
    <Card style={{ margin: '20px', padding: '10px' }}>
      <CardContent>
        <Typography variant="h5" component="div" onClick={toggleExpand} style={{ cursor: 'pointer' }}>
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
            <IconButton color="primary" onClick={toggleExpand}>
              <CommentIcon />
            </IconButton>
          </Tooltip>
          <Button onClick={handleExpandPost} variant="outlined" style={{ marginLeft: 'auto' }}>
            Expand
          </Button>
        </div>
      </CardContent>
      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        <CardContent>
          {comments.map((comment, index) => (
            <Typography key={index} variant="body2" color="text.secondary">
              {comment.comment} - {comment.userId}
            </Typography>
          ))}
          <div style={{ display: 'flex', marginTop: '10px' }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Add a comment"
              value={newComment}
              onChange={handleCommentChange}
            />
            <Button onClick={handleSubmitComment} color="primary" style={{ marginLeft: '10px' }}>
              Submit
            </Button>
          </div>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default PostCard;
