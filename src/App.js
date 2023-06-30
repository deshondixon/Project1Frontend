import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { Text, Container, Grid, Card, Input, Spacer } from '@nextui-org/react';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';

export default function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    const credentials = { username, password };
    console.log(credentials);
    try {
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();
      console.log(data);
      console.log(data.accessToken);
      console.log(parseJwt(data.accessToken));
      document.cookie = data.accessToken;
      console.log(document.cookie);
      if (parseJwt(data.accessToken).Position === 'Finance Manager') {
        navigate('/finance-manager');
      } else {
        navigate('/employee');
      }
    } catch (error) {
      console.log(error);
      setErrorMessage('Invalid username or password. Please try again.');
    }
  };

  const handleRegisterClick = () => {
    navigate('/register');
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
    <>
      <Grid.Container gap={2} justify='center'>
        <Grid>
          <Spacer y={2} />
          <Text
            h1
            size={50}
            css={{
              textAlign: 'center',
              textGradient: '45deg, $yellow600 -20%, $red600 100%',
            }}
            weight='bold'
          >
            Welcome to the CMS!
          </Text>

          <Spacer y={2} />
          <Container maxWidth='sm'>
            <Card
              style={{
                padding: '2rem',
                paddingLeft: '5rem',
                paddingRight: '5rem',
              }}
            >
              <Card.Body>
                {errorMessage && (
                  <Text color='#ff0000' align='center'>
                    {errorMessage}
                  </Text>
                )}

                <Text
                  h1
                  size={30}
                  css={{
                    textAlign: 'center',
                    textGradient: '45deg, $yellow600 -20%, $red600 100%',
                  }}
                >
                  Login
                </Text>
                <Spacer y={2} />
                <Input
                  auto
                  bordered
                  color='secondary'
                  labelPlaceholder='Username'
                  placeholder='Enter username'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <Spacer y={2} />
                <Input.Password
                  auto
                  bordered
                  labelPlaceholder='Password'
                  placeholder='Enter password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Spacer y={1} />
                <Button
                  type='submit'
                  variant='contained'
                  color='primary'
                  onClick={handleClick}
                  endIcon={<LoginIcon />}
                >
                  Login
                </Button>
                <Spacer y={2} />

                <h3>New here? Sign up!</h3>
                <Spacer />
                <Button
                  type='button'
                  variant='contained'
                  color='secondary'
                  onClick={handleRegisterClick}
                  endIcon={<HowToRegIcon />}
                >
                  Register
                </Button>
              </Card.Body>
            </Card>
          </Container>
        </Grid>
      </Grid.Container>
    </>
  );
}
