import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { Text, Container, Grid, Card, Input, Spacer } from '@nextui-org/react';

export default function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

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
        document.cookie = data.accessToken;
        console.log(document.cookie);
        if (parseJwt(data.accessToken).Position === 'Finance Manager') {
          navigate('/finance-manager');
        } else {
          navigate('/employee');
        }
      })
      .catch((error) => console.log(error));
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
      <Spacer y={2} />

      <Grid.Container gap={2} justify='center'>
        <Grid>
          <Container>
            <Text
              h1
              size={60}
              css={{
                textAlign: 'center',
                textGradient: '45deg, $yellow600 -20%, $red600 100%',
              }}
              weight='bold'
            >
              Welcome to the CMS!
            </Text>
          </Container>
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
                  size={30}
                  css={{
                    textAlign: 'center',
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
                <Spacer y={1} />

                <h3>New here? Sign up!</h3>
                <Button
                  type='button'
                  variant='contained'
                  color='primary'
                  onClick={handleRegisterClick}
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
