import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export default function Status() {
  const paperStyle = { padding: '50px 20px', width: 600, margin: '20px auto' };
  const [reimbursement, setReimbursement] = useState(null);
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    const searchUrl = `http://localhost:8080/reimbursements?search=${encodeURIComponent(
      searchText
    )}`;

    fetch(searchUrl)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.length > 0) {
          setReimbursement(data[0]);
        } else {
          setReimbursement(null);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <Container>
      <Paper elevation={20} style={paperStyle}>
        <div>
          <h2>Ticket Status</h2>
          <TextField
            label='Search Description'
            placeholder='Enter Description to search'
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            fullWidth
          />
          <Button
            variant='contained'
            color='primary'
            onClick={handleSearch}
            fullWidth
          >
            Search
          </Button>
          {reimbursement && (
            <div>
              <h3>Reimbursement Ticket</h3>
              <p>
                Description: {reimbursement.description}
                <br />
                Status: {reimbursement.status}
                <br />
                Expense Amount: {reimbursement.expenseAmount}
              </p>
            </div>
          )}
          {!reimbursement && searchText && (
            <p>No matching reimbursement ticket found.</p>
          )}
        </div>
      </Paper>
    </Container>
  );
}
