import React, { useState } from 'react';

import {
  Input,
  Spacer,
  Text,
  Container,
  Grid,
  Card,
  Button,
} from '@nextui-org/react';

export default function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState('');

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
            `${employee.username} ${employee.lastName} was successfully registered!`
          );
        } else {
          throw new Error('User is already registered');
        }
      })
      .catch((error) => {
        console.log(error);
        setSubmissionStatus('User is already registered');
      });
  };

  const usernameIsRegistered = () => {
    return username === 'username';
    // I STILL NEED TO FINISH THIS!!
  };

  return (
    <>
      <Grid gap={2}>
        <Container>
          <Card>
            <Card.Body>
              <Text
                h1
                size={20}
                css={{
                  textGradient: '45deg, $yellow600 -20%, $red600 100%',
                }}
                weight='bold'
              >
                Create Account
              </Text>
              <Spacer />
              <Spacer />
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
              <Spacer />
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
              <Spacer />
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
              <Spacer />
              <Input.Password
                labelPlaceholder='Password'
                placeholder='Enter password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Button onClick={handleClick} auto color='success' flat light>
                Register
              </Button>

              {submissionStatus && <p>{submissionStatus}</p>}
            </Card.Body>
          </Card>
        </Container>
      </Grid>
    </>
  );
}
