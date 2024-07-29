import React, { useState, useEffect } from "react";
import "../../Asset/Css/Posts.css";
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import PostCard from './PostCard';
import { api_create_post, api_fetch_posts } from '../../API/PostsApi.js';

function PostsPage() {
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [postTitle, setPostTitle] = useState('');
  const [postMessage, setPostMessage] = useState('');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  let postid = 0;
  let uid = "Richie_Hsieh"

  useEffect(() => {
    api_fetch_posts(uid, (data) => {
      setPosts(data);
      console.log(posts);
      setLoading(false);
    });
  }, []);

  const handleCreatePostClick = () => {
    setPostTitle(''); // Clear the post title input
    setPostMessage(''); // Clear the post message input
    setShowCreatePost(!showCreatePost);
  };

  const handleSubmitPost = (event) => {
    event.preventDefault();
    const post_data = { postid: postid++, userId: "Richie_Hsieh", postTitle, postMessage, likeCount: 0, isLikedByMe: 0, comments:[]};
    console.log(post_data);
    api_create_post(post_data, (data) => {
      setPosts([...posts, data]);
      setShowCreatePost(false);
    });
  };

  return (
    <div className="container">
      <button className="createpostbutton" onClick={handleCreatePostClick}>
        {showCreatePost ? 'Cancel' : 'Create Post'}
      </button>
      {showCreatePost && (
        <div className="create-post-template">
          <h2>Create a New Post</h2>
          <form onSubmit={handleSubmitPost}>
            <FormControl fullWidth margin="normal">
              <InputLabel htmlFor="post-title">Title</InputLabel>
              <OutlinedInput
                id="post-title"
                label="Title"
                value={postTitle}
                onChange={(e) => setPostTitle(e.target.value)}
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel htmlFor="post-content">Content</InputLabel>
              <OutlinedInput
                id="post-content"
                label="Content"
                multiline
                rows={4}
                value={postMessage}
                onChange={(e) => setPostMessage(e.target.value)}
              />
            </FormControl>
            <button type="submit" className="submitpostbutton">Submit</button>
          </form>
        </div>
      )}
      <Container>
        {loading ? (
          <CircularProgress />
        ) : (
          posts.map(post => (
            <PostCard key={post.postid} post={post} />
          ))
        )}
      </Container>
    </div>
  );
}

export default PostsPage;