import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { api_logout } from './api';
import { useEffect } from 'react';
import { useState } from 'react';



const Logout = () => {

    const navigate = useNavigate();


    const handleLogout = () => {
        const logout = {};
        api_logout(logout, (data) => {
            if (data.logoutStatus) {
                navigate('/login');
            }
        });
    };


  return (
    <Button
    fullWidth
    variant="contained"
    onClick={handleLogout}
    >

        Logout
    </Button>
  );
};

export default Logout;
