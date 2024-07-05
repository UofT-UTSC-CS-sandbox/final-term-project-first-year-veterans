/*
  Reference: I have used CHATGPT, Github Copilot  and my own knowledge to code the following file.
*/

import React, { useState } from 'react';
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Grid
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SignupForm = ({ onLogin }) => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  }

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handleDOBChange = (e) => {
    setDob(e.target.value);
  }

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordMismatch(e.target.value !== confirmPassword);
  }

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setPasswordMismatch(e.target.value !== password);
  }

  const handleLoginButton = (e) => {
    e.preventDefault();
    console.log("Navigating to login");
    navigate('/login');
  }

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
          Sign Up
        </Typography>
        <form>
          <TextField
            fullWidth
            label="First Name"
            variant="outlined"
            margin="normal"
            type="text"
            value={firstName}
            onChange={handleFirstNameChange}
          />
          <TextField
            fullWidth
            label="Last Name"
            variant="outlined"
            margin="normal"
            type="text"
            value={lastName}
            onChange={handleLastNameChange}
          />
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            type="email"
            value={email}
            onChange={handleEmailChange}
          />
          <TextField
            fullWidth
            label="Date of Birth"
            variant="outlined"
            margin="normal"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            value={dob}
            onChange={handleDOBChange}
          />
          <TextField
            fullWidth
            label="Username"
            variant="outlined"
            margin="normal"
            type="text"
            value={username}
            onChange={handleUsernameChange}
          />
          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            margin="normal"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <TextField
            fullWidth
            label="Confirm Password"
            variant="outlined"
            margin="normal"
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          {passwordMismatch && (
            <Alert severity="error" sx={{ marginTop: '1rem' }}>
              Passwords do not match
            </Alert>
          )}
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Button
                variant="contained"
                sx={{ marginTop: '1rem', height: '80%' }}
                fullWidth
                onClick={handleLoginButton}
              >
                Have an account? Login
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                fullWidth
                variant="contained"
                sx={{ marginTop: '1rem', height: '80%' }}
                disabled={passwordMismatch}
              >
                Sign Up
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Box>
  );
};

export default SignupForm;
