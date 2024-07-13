import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import TopBar from './TopBar.jsx';
import SearchBar from './search_bar';
import ProfileForm from './ProfileForm';
import CalendarPage from './Calendar/CalendarPage.jsx';
import FriendList from './FriendList';
import UserPage from './UserPage';
import PostsPage from './PostsPage';
import HomePage from './Home';
import Logout from './Logout.jsx';

function Main() {
  const [notificationTrigger, setNotificationTrigger] = useState(true);

  return (
    <div className="Main">
      <TopBar notificationTrigger={notificationTrigger} setNotificationTrigger={setNotificationTrigger} />
      <Routes>
        <Route path="/" element={<Navigate to="home" />} />
        <Route path="search" element={<SearchBar />} />
        <Route path="profile" element={<ProfileForm />} />
        <Route path="home" element={<HomePage />} />
        <Route path="postpage" element={<PostsPage />} />
        <Route path="calendar" element={<CalendarPage notificationTrigger={notificationTrigger} setNotificationTrigger={setNotificationTrigger} />} />
        <Route path="friends" element={<FriendList />} />
        <Route path="userpage" element={<UserPage />} />
        <Route path="posts" element={<PostsPage />} />
        <Route path="logout" element={<Logout/>} />
      </Routes>
    </div>
  );
}

export default Main;
