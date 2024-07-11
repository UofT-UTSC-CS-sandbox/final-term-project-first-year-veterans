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

const uid = 'Richie_Hsieh'; // Replace with actual user ID

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
    api_update_post_like({ pid: post.postid, uid: uid }, (data) => {
      console.log('data: ', data);
      console.log('updatedPost: ', data.updated_post);
      setLikeCount(data.updated_post.likes);
      setIsClicked(data.nowlike);
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
        userId: "Richie_Hsieh", // Replace with actual user ID
        comment: newComment,
        postidentification: post.postid
      };
      console.log("Submitting comment data:", commentData);
      setNewComment(''); // Clear the input field
      api_add_new_comment(commentData, (error, updatedPost) => {
        if (error) {
          console.error('Error adding comment:', error);
        } else {
          api_fetch_comments(post.postid, (fetchedComments) => {
            setComments(fetchedComments);
          });
        }
      });
    }
  };

  return (
    <Card style={{ margin: '20px', padding: '10px' }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {post.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {post.body}
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
        </div>
        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
          <div style={{ marginTop: '10px' }}>
            {comments.map((comment, index) => (
              <Typography key={index} variant="body2" color="text.secondary">
                {comment.comment}
              </Typography>
            ))}
            <TextField
              label="Add a comment"
              variant="outlined"
              fullWidth
              value={newComment}
              onChange={handleCommentChange}
              style={{ marginTop: '10px' }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmitComment}
              style={{ marginTop: '10px' }}
            >
              Submit
            </Button>
          </div>
        </Collapse>
      </CardContent>
    </Card>
  );
};

export default PostCard;
