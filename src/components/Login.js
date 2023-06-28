import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export default function Login() {
  const paperStyle = { padding: '50px 20px', width: 300, margin: '20px auto' };
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleClick = (e) => {
    e.preventDefault();
    const credentials = { username, password };
    console.log(credentials);
    fetch('http://localhost:8080/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        console.log(data.accessToken);
        console.log(parseJwt(data.accessToken));
      })
      .catch((error) => console.log(error));
  };

  function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );

    return JSON.parse(jsonPayload);
  }

  return (
    <Container>
      <Paper elevation={20} style={paperStyle}>
        <div>
          <h2>Login</h2>
          <form>
            <TextField
              label='Username'
              placeholder='Enter username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              required
            />
            <TextField
              label='Password'
              placeholder='Enter password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              required
            />
            <Button
              type='submit'
              variant='contained'
              color='primary'
              onClick={handleClick}
              fullWidth
            >
              Login
            </Button>
          </form>
        </div>
      </Paper>
    </Container>
  );
}
