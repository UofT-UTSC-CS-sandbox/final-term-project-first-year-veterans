import logo from '../logo.svg';
import React from 'react';
import TopBar from './top_bar';
import SearchBar from './search_bar';
import ProfileForm from './ProfileForm';
<<<<<<< HEAD
import PostsPage from './PostsPage';
import CalendarPage from './Calendar/CalendarPage';
import HomePage from './Home';
import { PageProvider, usePage } from './PageContext';
import { useState } from 'react';

function Main() {
  const [NotificationIcon, setNotificationIcon] = useState(false);

  return (
    <PageProvider>
      <div className="Main">
          <TopBar NotificationIcon={NotificationIcon} setNotificationIcon={setNotificationIcon}/>
          <PageContent NotificationIcon={NotificationIcon} setNotificationIcon={setNotificationIcon}/>
=======
import FriendList from './FriendList';
import UserPage from './UserPage';
import { PageProvider, usePage } from './PageContext';
import { useState } from 'react';


function Main() {
  return (
    <PageProvider>
      <div className="Main">
          <TopBar />
          <PageContent />
>>>>>>> origin/DEV-2-Friendship/Group_System
      </div>
  </PageProvider>
  );
}

<<<<<<< HEAD
const PageContent = (props) => {
  const { currentPage } = usePage();
  console.log(props);
=======
const PageContent = () => {
  const { currentPage } = usePage();
  const [userpageInfo, setUserpageInfo] = useState('');

>>>>>>> origin/DEV-2-Friendship/Group_System
  if (currentPage === 'Search') {
      return <SearchBar />;
  } else if (currentPage === 'Profile') {
      return <ProfileForm />;
<<<<<<< HEAD
  } else if (currentPage === 'Posts') {
    return <PostsPage/>;
  } else if (currentPage === 'Home') {
    return <HomePage/>;
  } else if (currentPage === 'Calendar') {
      return <CalendarPage  NotificationIcon={props.NotificationIcon} setNotificationIcon={props.setNotificationIcon} />;
  } else {
    return null;
=======
  } else if (currentPage === 'Friends') {
      return <FriendList setUserpageInfo={setUserpageInfo}/>;
  } else if (currentPage === 'User') {
      console.log("userInfo: ", userpageInfo);
      return <UserPage userpageInfo={userpageInfo}/>;
  } else {
      return null;
>>>>>>> origin/DEV-2-Friendship/Group_System
  }
};

export default Main;