import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function Pending() {
  const paperStyle = { padding: '50px 20px', width: 600, margin: '20px auto' };
  const [pendingTickets, setPendingTickets] = useState([]);

  const fetchPendingTickets = () => {
    fetch('http://localhost:8080/reimbursements')
      .then((res) => res.json())
      .then((data) => {
        const pending = data.filter(
          (reimbursement) => reimbursement.status.toLowerCase() === 'pending'
        );
        setPendingTickets(pending);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchPendingTickets();
  }, []);

  return (
    <Container>
      <Paper elevation={20} style={paperStyle}>
        <div>
          {pendingTickets.map((reimbursement) => (
            <Accordion key={reimbursement.id}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${reimbursement.id}-content`}
                id={`panel${reimbursement.id}-header`}
              >
                <Typography>Ticket Number: {reimbursement.id}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Description: {reimbursement.description}
                  <br />
                  Status: {reimbursement.status}
                  <br />
                  Expense Amount: {reimbursement.expenseAmount}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </Paper>
    </Container>
  );
}
