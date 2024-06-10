import logo from '../logo.svg';
import React from 'react';
import TopBar from './top_bar';
import SearchBar from './search_bar';

function Main() {
  return (
    <div className="Main">
      <TopBar />
      <SearchBar />
    </div>
  );
}

export default Main;