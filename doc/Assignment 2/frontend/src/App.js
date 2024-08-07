import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SignupForm from './Components/SignUpForm.jsx';
import Login from './Components/Login.jsx';
import Main from './Components/Main.jsx';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // Show loading screen
  }
  const REACT_APP_BACKEND_URL= process.env.REACT_APP_BACKEND_URL
  console.log(REACT_APP_BACKEND_URL)

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/main/*" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignupForm />} />
      </Routes>
    </div>
  );
}

export default App;
