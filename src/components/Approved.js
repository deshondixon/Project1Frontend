import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function Approved() {
  const paperStyle = { padding: '50px 20px', width: 600, margin: '20px auto' };
  const [approvedTickets, setApprovedTickets] = useState([]);

  const fetchApprovedTickets = () => {
    fetch('http://localhost:8080/reimbursements')
      .then((res) => res.json())
      .then((data) => {
        const approved = data.filter(
          (reimbursement) => reimbursement.status.toLowerCase() === 'approved'
        );
        setApprovedTickets(approved);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchApprovedTickets();
  }, []);

  return (
    <Container>
      <Paper elevation={20} style={paperStyle}>
        <div>
          {approvedTickets.map((reimbursement) => (
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
