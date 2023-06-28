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
            `${employee.username} was successfully registered!`
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

  return (
    <>
      <Grid gap={2}>
        <Container>
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
              <Button onClick={handleClick} auto color='success' flat light>
                Register
              </Button>
              <Spacer />

              {submissionStatus && <p>{submissionStatus}</p>}
              <Spacer y={1} />
            </Card.Body>
          </Card>
        </Container>
      </Grid>
    </>
  );
}
