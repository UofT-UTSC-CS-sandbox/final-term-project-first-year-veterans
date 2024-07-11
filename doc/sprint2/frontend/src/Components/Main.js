import logo from '../logo.svg';
import React from 'react';
import TopBar from './top_bar';
import SearchBar from './search_bar';
import ProfileForm from './ProfileForm';
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
      </div>
  </PageProvider>
  );
}

const PageContent = (props) => {
  const { currentPage } = usePage();
  console.log(props);
  if (currentPage === 'Search') {
      return <SearchBar />;
  } else if (currentPage === 'Profile') {
      return <ProfileForm />;
  } else if (currentPage === 'Posts') {
    return <PostsPage/>;
  } else if (currentPage === 'Home') {
    return <HomePage/>;
  } else if (currentPage === 'Calendar') {
      return <CalendarPage  NotificationIcon={props.NotificationIcon} setNotificationIcon={props.setNotificationIcon} />;
  } else {
    return null;
  }
};

export default Main;