import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

export default function Login() {
  const paperStyle = { padding: '50px 20px', width: 600, margin: '20px auto' };
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    const user = { username, password };
    console.log(user);
    fetch('http://localhost:8080/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Logged in successfully:', data);
        setLoginStatus('Login successful');
        // Handle successful login, e.g., store the token in local storage or redirect
      })
      .catch((error) => {
        console.error('Login failed:', error);
        setLoginStatus('Login failed');
        // Handle login failure, e.g., display an error message
      });
  };

  return (
    <Container>
      <Paper elevation={3} style={paperStyle}>
        <h1 style={{ color: 'blue' }}>
          <u>Login</u>{' '}
        </h1>
        <Box
          component='form'
          sx={{
            '& > :not(style)': { m: 1 },
          }}
          noValidate
          autoComplete='off'
        >
          <TextField
            id='outlined-basic'
            label='Username'
            variant='outlined'
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            id='outlined-basic'
            label='Password'
            variant='outlined'
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant='contained' onClick={handleLogin}>
            Login
          </Button>
          {loginStatus && <p>{loginStatus}</p>}
        </Box>
      </Paper>
    </Container>
  );
}
