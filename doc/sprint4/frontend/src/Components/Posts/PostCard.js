import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, IconButton, Tooltip, Collapse, TextField, Button, Avatar } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import { api_update_post_like, api_add_new_comment, api_fetch_comments } from '../../API/PostsApi';

const uid = 'Richie_Hsieh';

const PostCard = ({ post }) => {
  const [likeCount, setLikeCount] = useState(post.likeCount);
  const [isClicked, setIsClicked] = useState(post.isLikedByMe);
  const [isExpanded, setIsExpanded] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    setIsClicked(post.isLikedByMe);
  }, [post]);

  const handleLike = (event) => {
    event.stopPropagation();
    api_update_post_like({ pid: post.postid, uid }, (data) => {
      setLikeCount(data.updated_post.likes);
      setIsClicked(data.nowlike);
    });
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      api_fetch_comments(post.postid, setComments);
    }
  };

  const handleCommentChange = (event) => setNewComment(event.target.value);

  const handleSubmitComment = () => {
    if (newComment.trim() !== '') {
      const commentData = {
        userId: "Richie_Hsieh",
        comment: newComment,
        postidentification: post.postid,
      };
      setNewComment('');
      api_add_new_comment(commentData, (error, updatedPost) => {
        if (!error) {
          api_fetch_comments(post.postid, setComments);
        }
      });
    }
  };

  return (
    <Card className="postCard">
      <CardContent className="postCardContent">
        <div className="profileSection">
          <Avatar src={post.userProfilePic} alt={post.userName} />
          <div>
            <Typography className="profileName">
              {post.userName}
            </Typography>
            <Typography className="userId">
              @{post.userId}
            </Typography>
          </div>
        </div>
        <Typography className="postHeader" onClick={toggleExpand}>
          {post.postTitle}
        </Typography>
        <Typography className="postMessage">
          {post.postMessage}
        </Typography>
        {post.postImage && (
          <img src={post.postImage} alt="Post content" className="postImage" />
        )}
        <div className="postActions">
          <div>
            <Tooltip title="Like">
              <IconButton className="iconButton" onClick={handleLike} style={{ color: isClicked ? '#1da1f2' : '#657786' }}>
                <ThumbUpIcon />
              </IconButton>
            </Tooltip>
            <span>{likeCount}</span>
          </div>
          <Tooltip title="Comment">
            <IconButton className="iconButton" onClick={toggleExpand}>
              <CommentIcon />
            </IconButton>
          </Tooltip>
        </div>
      </CardContent>
      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        <CardContent className="commentSection">
          {comments.map((comment, index) => (
            <Typography key={index} variant="body2">
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
            <Button onClick={handleSubmitComment} className="submitpostbutton">
              Submit
            </Button>
          </div>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default PostCard;
