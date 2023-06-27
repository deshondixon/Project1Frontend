// import React, { useEffect, useState } from 'react';
// import Container from '@mui/material/Container';
// import Paper from '@mui/material/Paper';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';

// export default function Register() {
//   const paperStyle = { padding: '50px 20px', width: 600, margin: '20px auto' };
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [employees, setEmployees] = useState([]);
//   const [position, setPosition] = useState('');
//   const [submissionStatus, setSubmissionStatus] = useState('');

//   const handleClick = (e) => {
//     e.preventDefault();
//     const employee = { firstName, lastName, username, password, position };
//     console.log(employee);
//     fetch('http://localhost:8080/auth/register', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(employee),
//     })
//       .then((res) => {
//         if (res.ok) {
//           return res.json();
//         } else {
//           throw new Error('Error registering employee.');
//         }
//       })
//       .then((data) => {
//         console.log(data);
//         const registeredEmployee = data.employee; // Extract the "employee" data from the response
//         setEmployees([...employees, registeredEmployee]);
//         setSubmissionStatus(
//           `${registeredEmployee.firstName} ${registeredEmployee.lastName} successfully registered!`
//         );
//       })
//       .catch((error) => console.log(error));
//   };

//   useEffect(() => {
//     fetch('http://localhost:8080/employees')
//       .then((res) => {
//         if (res.ok) {
//           return res.json();
//         } else {
//           throw new Error('Error retrieving employees data.');
//         }
//       })
//       .then((data) => setEmployees(data))
//       .catch((error) => console.log(error));
//   }, []);

//   return (
//     <Container>
//       <Paper elevation={20} style={paperStyle}>
//         <div>
//           <h2>Registration</h2>
//           <form>
//             <TextField
//               label='First Name'
//               placeholder='Enter first name'
//               value={firstName}
//               onChange={(e) => setFirstName(e.target.value)}
//               fullWidth
//               required
//             />
//             <TextField
//               label='Last Name'
//               placeholder='Enter last name'
//               value={lastName}
//               onChange={(e) => setLastName(e.target.value)}
//               fullWidth
//               required
//             />
//             <TextField
//               label='Username'
//               placeholder='Enter username'
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               fullWidth
//               required
//             />
//             <TextField
//               label='Password'
//               placeholder='Enter password'
//               type='password'
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               fullWidth
//               required
//             />
//             <TextField
//               label='Position'
//               placeholder='Enter position'
//               value={position}
//               onChange={(e) => setPosition(e.target.value)}
//               fullWidth
//               required
//             />
//             <Button
//               type='submit'
//               variant='contained'
//               color='primary'
//               onClick={handleClick}
//               fullWidth
//             >
//               Register
//             </Button>
//           </form>
//           {submissionStatus && <p>{submissionStatus}</p>}
//           {employees.length > 0 && (
//             <div>
//               <h3>Registered Employees:</h3>
//               <ul>
//                 {employees.map((employee, index) => (
//                   <li key={index}>
//                     {employee.firstName} {employee.lastName}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </div>
//       </Paper>
//     </Container>
//   );
// }

import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export default function Register() {
  const paperStyle = { padding: '50px 20px', width: 600, margin: '20px auto' };
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState('');

  const handleClick = (e) => {
    e.preventDefault();
    if (usernameIsRegistered()) {
      setSubmissionStatus('Username is already registered!');
    } else {
      const employee = { firstName, lastName, username, password };
      console.log(employee);
      setSubmissionStatus(
        `${employee.username} ${employee.lastName} was successfully registered!`
      );
    }
  };

  const usernameIsRegistered = () => {
    return username === 'username';
    // I STILL NEED TO FINISH THIS!!
  };

  return (
    <Container>
      <Paper elevation={20} style={paperStyle}>
        <div>
          <h2>Registration</h2>
          <form>
            <TextField
              label='First Name'
              placeholder='Enter first name'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              fullWidth
              required
            />
            <TextField
              label='Last Name'
              placeholder='Enter last name'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              fullWidth
              required
            />
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
              Register
            </Button>
          </form>
          {submissionStatus && <p>{submissionStatus}</p>}
        </div>
      </Paper>
    </Container>
  );
}
