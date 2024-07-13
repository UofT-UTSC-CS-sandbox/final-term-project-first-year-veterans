import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import TopBar from './top_bar';
import SearchBar from './search_bar';
import ProfileForm from './ProfileForm';
import CalendarPage from './Calendar/CalendarPage';
import FriendList from './FriendList';
import UserPage from './UserPage';
import { PageProvider } from './PageContext';
import PostsPage from './PostsPage';
import HomePage from './Home';

function Main() {
  const [NotificationIcon, setNotificationIcon] = useState(false);

  return (
    <PageProvider>
      <div className="Main">
        <TopBar NotificationIcon={NotificationIcon} setNotificationIcon={setNotificationIcon} />
        <Routes>
          <Route path="/" element={<Navigate to="home" />} />
          <Route path="search" element={<SearchBar />} />
          <Route path="profile" element={<ProfileForm />} />
          <Route path="home" element={<HomePage />} />
          <Route path="postpage" element={<PostsPage />} />
          <Route path="calendar" element={<CalendarPage NotificationIcon={NotificationIcon} setNotificationIcon={setNotificationIcon} />} />
          <Route path="friends" element={<FriendList />} />
          <Route path="user" element={<UserPage />} />
          <Route path="posts" element={<PostsPage />} />
        </Routes>
      </div>
    </PageProvider>
  );
}

export default Main;
