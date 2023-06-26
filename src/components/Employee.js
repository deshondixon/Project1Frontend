import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

export default function Employee() {
  const paperStyle = { padding: '50px 20px', width: 600, margin: '20px auto' };
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [employees, setEmployees] = useState([]);
  const [position, setPosition] = useState('');
  const handleClick = (e) => {
    e.preventDefault();
    const employee = { firstName, lastName, username, password, position };
    console.log(employee);
    fetch('http://localhost:8080/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(employee),
    }).then((response) => {
      console.log('employee registered');
    });
  };

  useEffect(() => {
    fetch('http://localhost:8080/employees')
      .then((res) => res.json())
      .then((result) => {
        setEmployees(result);
      });
  }, []);

  return (
    <Container>
      <Paper elevation={3} style={paperStyle}>
        <h1 style={{ color: 'blue' }}>
          <u>Register Employee</u>{' '}
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
            label='First Name'
            variant='outlined'
            fullWidth
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            id='outlined-basic'
            label='Last Name'
            variant='outlined'
            fullWidth
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
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
          <TextField
            id='outlined-basic'
            label='Position ID'
            variant='outlined'
            fullWidth
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          />
          <Button variant='contained' onClick={handleClick}>
            Register
          </Button>
        </Box>
      </Paper>

      <h1>Employees</h1>

      <Paper elevation={3} style={paperStyle}>
        {employees.map((employee) => (
          <Paper
            elevation={6}
            style={{ margin: '10px', padding: '15px', textAlign: 'left' }}
            key={employee.id}
          >
            id: {employee.id}
            <br />
            FirstName: {employee.firstName}
            <br />
            LastName: {employee.lastName}
            <br />
            PositionID: {employee.position.id}
          </Paper>
        ))}
      </Paper>
    </Container>
  );
}
