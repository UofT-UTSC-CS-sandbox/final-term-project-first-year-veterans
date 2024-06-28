import logo from '../logo.svg';
import React from 'react';
import TopBar from './top_bar';
import SearchBar from './search_bar';
import ProfileForm from './ProfileForm';
import CalendarPage from './Calendar/CalendarPage';
import { PageProvider, usePage } from './PageContext';

function Main() {
  return (
    <PageProvider>
      <div className="Main">
          <TopBar />
          <PageContent />
      </div>
  </PageProvider>
  );
}

const PageContent = () => {
  const { currentPage } = usePage();

  if (currentPage === 'Search') {
      return <SearchBar />;
  } else if (currentPage === 'Profile') {
      return <ProfileForm />;
  } else if (currentPage === 'Calendar') {
      return <CalendarPage />;
  } else {
      return null;
  }
};

export default Main;