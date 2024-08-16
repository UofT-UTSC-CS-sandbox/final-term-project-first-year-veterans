/*
  Reference: I have used CHATGPT, Github Copilot and my own knowledge to code the following file.
*/

import React from 'react';
import { Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Asset/Css/App.css';
import EventNotification from './EventNotification.jsx';
import UserTools from './UserTools.js';
import Logout from './Logout.jsx';
import { useNavigate, useLocation } from 'react-router-dom';

function TopBar({ notificationTrigger, setNotificationTrigger }) {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPage = location.pathname.split('/').pop();

  const navItems = [
    { name: 'Home', path: '/main/home' },
    { name: 'Post Page', path: '/main/postpage' },
    { name: 'Project Page', path: '/main/projects' },
    { name: 'Calendar', path: '/main/calendar' },
    { name: 'Search', path: '/main/search' },
    { name: 'Chat', path: '/main/chat' },
    { name: 'Mentorship', path: '/main/mentorship' },
    { name: 'Videos', path: '/main/videos' }
  ];

  const handleClick = (e, path) => {
    e.preventDefault();
    navigate(path);
  };

  return (
    <div className="Top_Bar">
      <div className="container">
        <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
          <Navbar.Brand href='/main' className="d-flex align-items-center me-md-auto link-body-emphasis">
            <span className="webName fs-4">EDU PRODIGI</span>
          </Navbar.Brand>

          <ul className="nav nav-pills">
            {navItems.map((item) => (
              <li className="nav-item" key={item.name}>
                <a
                  href="#"
                  className={currentPage === item.name.toLowerCase().replace(' ', '') ? "nav-link active" : "nav-link"}
                  aria-current="page"
                  onClick={(e) => handleClick(e, item.path)}
                >
                  {item.name}
                </a>
              </li>
            ))}
            <li className="nav-item">
              <EventNotification notificationTrigger={notificationTrigger} setNotificationTrigger={setNotificationTrigger} />
            </li>
            <li className="nav-item">
              <UserTools handleClick={handleClick} />
            </li>
          </ul>
        </header>
      </div>
    </div>
  );
}

export default TopBar;
