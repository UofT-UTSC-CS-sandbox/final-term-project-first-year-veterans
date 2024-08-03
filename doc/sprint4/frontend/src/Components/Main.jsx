import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import TopBar from './TopBar.jsx';
import SearchBar from './search_bar';
import ProfileForm from './ProfileForm';
import CalendarPage from './Calendar/CalendarPage.jsx';
import FriendList from './FriendList';
import UserPage from './UserPage';
import PostsPage from './Posts/PostsPage.js';
import ProjectPage from './Project/projectPage.js';
import HomePage from './Home';
import Logout from './Logout.jsx';
import Chat from './chat';
import GroupPage from './GroupPage';
import socket from './socket'; // Import the socket object, the socket is created while importing
import Mentorship from './MentorshipPage.js';

import { api_checkAuth } from '../API/authAPI.js';

function Main({uid, setUid}) {
  const [notificationTrigger, setNotificationTrigger] = useState(true);
  const [newMessage, setNewMessage] = useState({ sender: '', time: '', content: '' });
  const navigate = useNavigate();

  useEffect(() => {
    api_checkAuth((data) => {
      if (data.redirectToLogin) {
        console.log("Not authenticated");
        navigate('/login');
      }
      else {
        console.log("Authenticated");
        setUid(data.uid);

        socket.emit('join', data.uid);

        socket.on('chat message', (message) => {
          setNewMessage(message); // The newest message, not all messages
        });

        return () => {
          socket.off('chat message');
        };
      }
    });

  }, []);

  const sendMessage = (message) => {
    socket.emit('chat message', message);
  };

  return (
    <div className="Main">
      <TopBar notificationTrigger={notificationTrigger} setNotificationTrigger={setNotificationTrigger} />
      <Routes>
        <Route path="/" element={<Navigate to="home" />} />
        <Route path="search" element={<SearchBar />} />
        <Route path="profile" element={<ProfileForm />} />
        <Route path="home" element={<HomePage uid={uid} setUid={setUid}/>} />
        <Route path="postpage" element={<PostsPage />} />
        <Route path="calendar" element={<CalendarPage notificationTrigger={notificationTrigger} setNotificationTrigger={setNotificationTrigger} />} />
        <Route path="friends" element={<FriendList />} />
        <Route path="userpage" element={<UserPage />} />
        <Route path="posts" element={<PostsPage />} />
        <Route path="projects" element={<ProjectPage />} />
        <Route path="logout" element={<Logout/>} />
        <Route path="userpage" element={<UserPage />} />
        <Route path="mentorship" element={<Mentorship />} />
        <Route path="chat" element={<Chat uid={uid} newMessage={newMessage} sendMessage={sendMessage} />} />
        <Route path="grouppage" element={<GroupPage />} />
      </Routes>
    </div>
  );
}

export default Main;
