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
            <li className="nav-item"><a href="#" className={currentPage === 'Home' ? "nav-link active" : "nav-link"} aria-current="page" onClick={(e) => handleClick(e, 'Home')}>Home</a></li>
            <li className="nav-item"><a href="#" className={currentPage === 'Users' ? "nav-link active" : "nav-link"} aria-current="page" onClick={(e) => handleClick(e, 'Users')}>Users</a></li>
            <li className="nav-item"><a href="#" className={currentPage === 'Projects' ? "nav-link active" : "nav-link"} aria-current="page" onClick={(e) => handleClick(e, 'Projects')}>Projects</a></li>
            <li className="nav-item"><a href="#" className={currentPage === 'Posts' ? "nav-link active" : "nav-link"} aria-current="page" onClick={(e) => handleClick(e, 'Posts')}>Posts</a></li>
            <li className="nav-item"><a href="#" className={currentPage === 'Calendar' ? "nav-link active" : "nav-link"} aria-current="page" onClick={(e) => handleClick(e, 'Calendar')}>Calendar</a></li>
            <li className="nav-item"><a href="#" className="nav-link">Pricing</a></li>
            <li className="nav-item"><a href="#" className="nav-link">FAQs</a></li>
            <li><EventNotification NotificationIcon={props.NotificationIcon}/></li>
            <li className="nav-item"><UserTools handleClick={handleClick}/></li>
          </ul>
        </header>
      </div>
    </div>
  );
}

export default TopBar;