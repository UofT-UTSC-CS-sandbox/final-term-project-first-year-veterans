import React from 'react';
import { Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Asset/Css/App.css';

function TopBar() {
  return (
    <div className="Top_Bar">
      <div className="container">
        <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
          <Navbar.Brand href="/" className="d-flex align-items-center me-md-auto link-body-emphasis"> 
            <span className="webName fs-4">EDU PRODIGI</span>
          </Navbar.Brand>

          <ul className="nav nav-pills">
            <li className="nav-item"><a href="#" className="nav-link active" aria-current="page">Home</a></li>
            <li className="nav-item"><a href="#" className="nav-link">Features</a></li>
            <li className="nav-item"><a href="#" className="nav-link">Pricing</a></li>
            <li className="nav-item"><a href="#" className="nav-link">FAQs</a></li>
            <li className="nav-item"><a href="#" className="nav-link">About</a></li>
          </ul>
        </header>
      </div>
    </div>
  );
}

export default TopBar;