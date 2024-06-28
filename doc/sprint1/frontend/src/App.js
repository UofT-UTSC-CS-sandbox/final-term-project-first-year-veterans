import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { api_checkAuth } from './Components/api';  
import Main from './Components/Main';
import Login from './Components/login';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check if the cookie still work, check when the page is loaded
  useEffect(() => {
    api_checkAuth((data) => {
        const { loggedIn } = data;
        if (loggedIn) {
            setIsLoggedIn(true);
        }
        setIsLoading(false);
    });
  }, []);

  const handleLogin = (status) => {
      setIsLoggedIn(status);
  }

  if (isLoading) {
    return <div>Loading...</div>; // Show loading screen
  }

  return (
    <div className="App">
      {isLoggedIn ? <Main /> : <Login onLogin={handleLogin} />}
    </div>
  );
}

export default App;

