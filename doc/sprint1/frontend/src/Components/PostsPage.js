import React, { useState } from "react";
import "../Asset/Css/Posts.css";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import ListItemText from '@mui/material/ListItemText';
import { useEffect } from 'react';

function PostsPage() {
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [postTitle, setPostTitle] = useState('');
  const [postMessage, setPostMessage] = useState('');
  const [results, setResults] = useState([]);

  const handleCreatePostClick = () => {
    setShowCreatePost(!showCreatePost);
  };

  const handleSubmitPost = (event) => {
    event.preventDefault();
    setShowCreatePost(!showCreatePost);
    const search_data = { "postTitle": postTitle, "postMessage": postMessage };
    const callback = (data) => {
      setResults(data);
    };
    console.log(search_data);
  }

  return (
    <div className="container">
      <button className="createpostbutton" onClick={handleCreatePostClick}>Create Post</button>
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
            {/* <FormControl fullWidth margin="normal">
              <InputLabel htmlFor="post-category">Category</InputLabel>
              <Select id="post-category" label="Category">
                <MenuItem value="category1">Category 1</MenuItem>
                <MenuItem value="category2">Category 2</MenuItem>
                <MenuItem value="category3">Category 3</MenuItem>
              </Select>
            </FormControl> */}
            <button type="submit" className="submitpostbutton">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default PostsPage;