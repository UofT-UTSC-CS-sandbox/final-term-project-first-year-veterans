import React from 'react';
import { Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Asset/Css/App.css';
import { usePage } from './PageContext';
import EventNotification from './EventNotification.jsx';
import UserTools from './UserTools';

function TopBar(props) {
  const { currentPage, handlePageChange } = usePage();

  const handleClick = (e, page) => {
    e.preventDefault();
    handlePageChange(page);
  };
  
  return (
    <div className="Top_Bar">
      <div className="container">
        <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
          <Navbar.Brand href="/" className="d-flex align-items-center me-md-auto link-body-emphasis"> 
            
            <span className="webName fs-4">EDU PRODIGI</span>
            
          </Navbar.Brand>

          <ul className="nav nav-pills">
            <li className="nav-item"><a href="#" className={currentPage === 'Search' ? "nav-link active" : "nav-link"} aria-current="page" onClick={(e) => handleClick(e, 'Search')}>Search</a></li>
            <li className="nav-item"><a href="#" className={currentPage === 'Home' ? "nav-link active" : "nav-link"} aria-current="page" onClick={(e) => handleClick(e, 'Home')}>Home</a></li>
            <li className="nav-item"><a href="#" className={currentPage === 'PostPage' ? "nav-link active" : "nav-link"} aria-current="page" onClick={(e) => handleClick(e, 'PostPage')}>Post Page</a></li>
            <li className="nav-item"><a href="#" className={currentPage === 'Calendar' ? "nav-link active" : "nav-link"} aria-current="page" onClick={(e) => handleClick(e, 'Calendar')}>Calendar</a></li>
            <li><EventNotification NotificationIcon={props.NotificationIcon} setNotificationIcon={props.setNotificationIcon}/></li>
            <li className="nav-item"><UserTools handleClick={handleClick}/></li>
          </ul>
        </header>
      </div>
    </div>
  );
}

export default TopBar;