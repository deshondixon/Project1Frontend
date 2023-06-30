import React, { useState } from 'react';
import { Input, Spacer, Text, Container, Grid, Card } from '@nextui-org/react';
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';

export default function Reimbursement() {
  const [description, setDescription] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState('');
  const [submittedReimbursement, setSubmittedReimbursement] = useState(null);

  const handleClick = async (e) => {
    e.preventDefault();
    const reimbursement = {
      description,
      expenseAmount,
      status: 'Pending',
    };

    try {
      const response = await axios.post(
        'http://localhost:8080/reimbursements',
        reimbursement
      );
      const data = response.data;
      console.log(data);
      setSubmittedReimbursement(data);
      setSubmissionStatus('Successfully submitted!');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Spacer />
      <Grid.Container gap={2} justify='center'>
        <Grid>
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
                  size={30}
                  css={{
                    textAlign: 'center',
                    textGradient: '45deg, $yellow600 -20%, $red600 100%',
                  }}
                  weight='bold'
                >
                  Submit A Ticket
                </Text>
                <Spacer y={2} />
                <Input
                  auto
                  bordered
                  color='secondary'
                  labelPlaceholder='Description'
                  placeholder='Enter Description'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
                <Spacer y={2} />
                <Input
                  auto
                  bordered
                  initialValue='123'
                  color='secondary'
                  labelPlaceholder='Enter Number'
                  placeholder='Enter Expense Amount'
                  type='number'
                  value={expenseAmount}
                  onChange={(e) => setExpenseAmount(e.target.value)}
                  required
                />
                <Spacer y={2} />
                <Button
                  type='submit'
                  variant='contained'
                  color='primary'
                  onClick={handleClick}
                  endIcon={<SendIcon />}
                >
                  Submit
                </Button>
              </Card.Body>
              {submissionStatus && (
                <Text
                  size={25}
                  color='primary'
                  css={{
                    textAlign: 'center',
                  }}
                >
                  {submissionStatus}
                </Text>
              )}
              {submittedReimbursement && (
                <div>
                  <Text
                    css={{
                      textAlign: 'center',
                    }}
                  >
                    Ticket Number: {submittedReimbursement.id}
                  </Text>
                  <Text
                    css={{
                      textAlign: 'center',
                    }}
                  >
                    Description: {submittedReimbursement.description}
                  </Text>
                  <Text
                    css={{
                      textAlign: 'center',
                    }}
                  >
                    Status: {submittedReimbursement.status}
                  </Text>
                  <Text
                    css={{
                      textAlign: 'center',
                    }}
                  >
                    Expense Amount: {submittedReimbursement.expenseAmount}
                  </Text>
                </div>
              )}
            </Card>
          </Container>
        </Grid>
      </Grid.Container>
    </>
  );
}
