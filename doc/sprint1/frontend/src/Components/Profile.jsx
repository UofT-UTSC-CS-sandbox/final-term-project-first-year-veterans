import React from 'react';
import { useState } from 'react';
import { Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Asset/Css/App.css';
import ProfileForm from './ProfileForm';
import TopBar from './top_bar';


function Profile(){
    return (
      <div>
        <TopBar/>
        <ProfileForm />
      </div>
    );
    
}

export default Profile;