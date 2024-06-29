import logo from '../logo.svg';
import React from 'react';
import TopBar from './top_bar';
import SearchBar from './search_bar';
import ProfileForm from './ProfileForm';
import CalendarPage from './Calendar/CalendarPage';
import { PageProvider, usePage } from './PageContext';
import { useState } from 'react';

function Main() {
  const [toggleAddEvent, setToggleAddEvent] = useState(false);

  return (
    <PageProvider>
      <div className="Main">
          <TopBar toggleAddEvent={toggleAddEvent} />
          <PageContent toggleAddEvent={toggleAddEvent} setToggleAddEvent={setToggleAddEvent}/>
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
  } else if (currentPage === 'Calendar') {
      return <CalendarPage  toggleAddEvent={props.toggleAddEvent} setToggleAddEvent={props.setToggleAddEvent} />;
  } else {
      return null;
  }
};

export default Main;