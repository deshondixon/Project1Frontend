import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { Text, Container, Grid, Card, Input, Spacer } from '@nextui-org/react';
import axios from 'axios';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    const credentials = { username, password };

    try {
      const response = await axios.post(
        'http://localhost:8080/auth/login',
        credentials
      );
      const data = response.data;
      console.log(data);
      console.log(data.accessToken);
      console.log(parseJwt(data.accessToken));

      localStorage.setItem('accessToken', data.accessToken);

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
      <Spacer y={2} />

      <Grid.Container gap={2} justify='center'>
        <Grid>
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
                <Text
                  h1
                  size={20}
                  css={{
                    textGradient: '45deg, $yellow600 -20%, $red600 100%',
                  }}
                  weight='bold'
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
                <Spacer y={2} />
                <Button
                  type='submit'
                  variant='contained'
                  color='primary'
                  onClick={handleClick}
                >
                  Login
                </Button>
                <Spacer y={2} />
                {errorMessage && (
                  <Text color='#ff0000' align='center'>
                    {errorMessage}
                  </Text>
                )}
              </Card.Body>
            </Card>
          </Container>
        </Grid>
      </Grid.Container>
    </>
  );
}
