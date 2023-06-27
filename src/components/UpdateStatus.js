import * as React from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function UpdateStatus() {
  const paperStyle = { padding: '50px 20px', width: 600, margin: '20px auto' };
  const [reimbursements, setReimbursements] = React.useState([]);

  const handleApprove = (id) => {
    const updateUrl = `http://localhost:8080/reimbursements/${id}`;
    const updatedReimbursement = { status: 'Approved' };

    fetch(updateUrl, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedReimbursement),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        fetchReimbursements();
      })
      .catch((error) => console.log(error));
  };

  const handleDeny = (id) => {
    const deleteUrl = `http://localhost:8080/reimbursements/delete/${id}`;

    fetch(deleteUrl, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        fetchReimbursements();
      })
      .catch((error) => console.log(error));
  };

  const fetchReimbursements = () => {
    fetch('http://localhost:8080/reimbursements')
      .then((res) => res.json())
      .then((data) => setReimbursements(data))
      .catch((error) => console.log(error));
  };

  React.useEffect(() => {
    fetchReimbursements();
  }, []);

  return (
    <Container>
      <Paper elevation={20} style={paperStyle}>
        <div>
          <h1>All Reimbursements</h1>
          {reimbursements.map((reimbursement) => (
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
                  <br />
                  {reimbursement.status !== 'Approved' && (
                    <>
                      <Button
                        variant='contained'
                        color='primary'
                        onClick={() => handleApprove(reimbursement.id)}
                      >
                        Approve
                      </Button>
                      <Button
                        variant='contained'
                        color='secondary'
                        onClick={() => handleDeny(reimbursement.id)}
                      >
                        Deny
                      </Button>
                    </>
                  )}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </Paper>
    </Container>
  );
}
