import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { api_checkAuth } from './Components/api';
import Main from './Components/Main';
import SignupForm from './Components/SignUpForm.jsx';
import Login from './Components/Login.jsx';
import { Navigate } from 'react-router-dom';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    
    setIsLoading(false);
  }
  , []);


  if (isLoading) {
    return <div>Loading...</div>; // Show loading screen
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/main" element={<Main />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SignupForm />} />
      </Routes>
    </div>
  );
}

export default App;
