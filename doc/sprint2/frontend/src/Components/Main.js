import logo from '../logo.svg';
import React from 'react';
import TopBar from './top_bar';
import SearchBar from './search_bar';
import ProfileForm from './ProfileForm';
import CalendarPage from './Calendar/CalendarPage';
import { PageProvider, usePage } from './PageContext';
import { useState } from 'react';
import FriendList from './FriendList';
import UserPage from './UserPage';
import PostsPage from './PostsPage';
import { PageProvider, usePage } from './PageContext';


function Main() {
  const [NotificationIcon, setNotificationIcon] = useState(false);

  return (
    <PageProvider>
      <div className="Main">
          <TopBar NotificationIcon={NotificationIcon} setNotificationIcon={setNotificationIcon}/>
          <PageContent NotificationIcon={NotificationIcon} setNotificationIcon={setNotificationIcon}/>
      </div>
  </PageProvider>
  );
}

const PageContent = (props) => {
  const { currentPage } = usePage();
  const [userpageInfo, setUserpageInfo] = useState('');

  if (currentPage === 'Search') {
      return <SearchBar />;
  } else if (currentPage === 'Profile') {
      return <ProfileForm />;
  } else if (currentPage === 'Calendar') {
      return <CalendarPage  NotificationIcon={props.NotificationIcon} setNotificationIcon={props.setNotificationIcon} />;
  } else if (currentPage === 'Friends') {
      return <FriendList setUserpageInfo={setUserpageInfo}/>;
  } else if (currentPage === 'User') {
      console.log("userInfo: ", userpageInfo);
      return <UserPage userpageInfo={userpageInfo}/>;
    } else if (currentPage === 'Posts') {
      return <PostsPage/>;
    } else {
      return null;
  }
};

export default Main;