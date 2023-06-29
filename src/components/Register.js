import React, { useState } from 'react';
import { Input, Spacer, Text, Container, Grid, Card } from '@nextui-org/react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState('');
  const navigate = useNavigate();

  const handleClick = () => {
    const employee = { firstName, lastName, username, password };

    fetch('http://localhost:8080/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(employee),
    })
      .then((response) => {
        if (response.ok) {
          setSubmissionStatus(
            `${employee.username} was successfully registered!`
          );
          navigate('/');
        } else {
          throw new Error('User is already registered');
        }
      })
      .catch((error) => {
        console.log(error);
        setSubmissionStatus('User is already registered');
      });
  };

  return (
    <>
      <Spacer />
      <Grid.Container gap={2} justify='center'>
        <Grid>
          <Container>
            <Text
              h1
              size={30}
              css={{
                textAlign: 'center',
                textGradient: '45deg, $yellow600 -20%, $red600 100%',
              }}
              weight='bold'
            >
              Registration
            </Text>

            <Spacer />
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
                    textAlign: 'center',
                    textGradient: '45deg, $yellow600 -20%, $red600 100%',
                  }}
                  weight='bold'
                >
                  Create Account
                </Text>
                <Spacer y={2} />
                <Input
                  auto
                  bordered
                  color='secondary'
                  labelPlaceholder='First Name'
                  placeholder='Enter first name'
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
                <Spacer y={2} />
                <Input
                  auto
                  bordered
                  color='secondary'
                  labelPlaceholder='Last Name'
                  placeholder='Enter last name'
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
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
                  onClick={handleClick}
                  type='button'
                  variant='contained'
                  color='primary'
                >
                  Register
                </Button>
                <Spacer />

                {submissionStatus && (
                  <Text
                    color='#FF0000'
                    css={{
                      textAlign: 'center',
                    }}
                  >
                    {submissionStatus}
                  </Text>
                )}
                <Spacer y={1} />
              </Card.Body>
            </Card>
          </Container>
        </Grid>
      </Grid.Container>
    </>
  );
}
