// import React, { useState, useEffect } from 'react';
// import Container from '@mui/material/Container';
// import Paper from '@mui/material/Paper';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';

// export default function Reimbursement() {
//   const paperStyle = { padding: '50px 20px', width: 600, margin: '20px auto' };
//   const [id, setId] = useState('');
//   const [description, setDescription] = useState('');
//   const [status, setStatus] = useState('');
//   const [expenseAmount, setExpenseAmount] = useState('');
//   const [reimbursements, setReimbursements] = useState([]);
//   const [submissionStatus, setSubmissionStatus] = useState('');

//   const handleClick = (e) => {
//     e.preventDefault();
//     const reimbursement = { id, description, status, expenseAmount };
//     console.log(reimbursement);
//     fetch('http://localhost:8080/reimbursements', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(reimbursement),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data);
//         setReimbursements([...reimbursements, data]);
//         setSubmissionStatus('Successfully submitted!');
//       })
//       .catch((error) => console.log(error));
//   };

//   useEffect(() => {
//     fetch('http://localhost:8080/reimbursements')
//       .then((res) => res.json())
//       .then((data) => setReimbursements(data))
//       .catch((error) => console.log(error));
//   }, []);

//   return (
//     <Container>
//       <Paper elevation={20} style={paperStyle}>
//         <div>
//           <h2>Submit A Ticket</h2>
//           <form>
//             <TextField
//               label='ID'
//               placeholder='Enter ID'
//               value={id}
//               onChange={(e) => setId(e.target.value)}
//               fullWidth
//               required
//             />
//             <TextField
//               label='Description'
//               placeholder='Enter Description'
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               fullWidth
//               required
//             />
//             <TextField
//               label='Status'
//               placeholder='Enter status'
//               value={status}
//               onChange={(e) => setStatus(e.target.value)}
//               fullWidth
//               required
//             />
//             <TextField
//               label='Expense Amount'
//               placeholder='Enter Expense Amount'
//               type='password'
//               value={expenseAmount}
//               onChange={(e) => setExpenseAmount(e.target.value)}
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

export default function Reimbursement() {
  const paperStyle = { padding: '50px 20px', width: 600, margin: '20px auto' };
  const [description, setDescription] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState('');
  const [submittedReimbursement, setSubmittedReimbursement] = useState(null);

  const handleClick = (e) => {
    e.preventDefault();
    const reimbursement = {
      description,
      expenseAmount,
      status: 'Pending',
    };
    console.log(reimbursement);

    fetch('http://localhost:8080/reimbursements', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reimbursement),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setSubmittedReimbursement(data);
        setSubmissionStatus('Successfully submitted!');
      })
      .catch((error) => console.log(error));
  };

  return (
    <Container>
      <Paper elevation={20} style={paperStyle}>
        <div>
          <h2>Submit A Ticket</h2>
          <form>
            <TextField
              label='Description'
              placeholder='Enter Description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              required
            />
            <TextField
              label='Expense Amount'
              placeholder='Enter Expense Amount'
              type='number'
              value={expenseAmount}
              onChange={(e) => setExpenseAmount(e.target.value)}
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
              Submit
            </Button>
          </form>
          {submissionStatus && <p>{submissionStatus}</p>}
          {submittedReimbursement && (
            <div>
              <h3>Submitted Reimbursement:</h3>
              <p>Ticket Number: {submittedReimbursement.id}</p>
              <p>Description: {submittedReimbursement.description}</p>
              <p>Status: {submittedReimbursement.status}</p>
              <p>Expense Amount: {submittedReimbursement.expenseAmount}</p>
            </div>
          )}
        </div>
      </Paper>
    </Container>
  );
}
