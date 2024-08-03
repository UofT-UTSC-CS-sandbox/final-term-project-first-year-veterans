import React, { useEffect, useState } from 'react';
import {
  Container,
  Box,
  TextField,
  Typography,
  Grid,
  Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { api_signin } from './api';


function Login({setUid}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const signIn_data = { email, password };

    api_signin(signIn_data,(data) => {
      console.log("sign in data: ", data);
      if (data.signinCorrect) {
        console.log("sign in successful: " + data.uid);
        setUid(data.uid);
        navigate('/main');
      }
    });
  }, []);

  const handleLogin = (event) => {
    event.preventDefault();

    const signIn_data = { email, password };

    api_signin(signIn_data, (data) => {
      const { signinCorrect } = data;
      if (!signinCorrect) {
        console.log("sign in failed");
      } else {
        console.log("sign in successful");
        setUid(data.uid);
        navigate('/main'); // Navigate to the main page after login
      }
    });
  };

  const handleSignUp = (event) => {
    event.preventDefault();
    console.log("Navigating to sign up");
    navigate('/signup'); // Navigate to the signup page
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f0f0f0',
      }}
    >
      <Container
        maxWidth="xs"
        sx={{
          backgroundColor: '#fdd7a0',
          padding: '2rem',
          borderRadius: '16px',
          boxShadow: '0px 0px 15px rgba(0,0,0,0.2)',
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#d9534f' }}>
          Login
        </Typography>
        <form>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value) }
          />
          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            margin="normal"
            type="password"
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
          />
         <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Button
                    type="button"
                    variant="contained"
                    sx={{ marginTop: '1rem', height: '80%' }}
                    fullWidth
                    onClick={handleSignUp}
                  >
                    Sign Up
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ marginTop: '1rem', height: '80%' }}
                    onClick={handleLogin}
                  >
                    Login
                  </Button>
                </Grid>
              </Grid>
              <p className="mt-5 mb-3 text-body-secondary">© {(new Date()).getFullYear()}</p>
        </form>
      </Container>
    </Box>
  );
}

export default Login;
