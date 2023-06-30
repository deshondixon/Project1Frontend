import * as React from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import { Table, Spacer, Text, Container } from '@nextui-org/react';
import axios from 'axios';

export default function UpdateStatus() {
  const [pendingReimbursements, setPendingReimbursements] = React.useState([]);
  const [approvedReimbursements, setApprovedReimbursements] = React.useState(
    []
  );

  const columns = [
    {
      key: 'description',
      label: 'Description',
    },
    {
      key: 'expenseAmount',
      label: 'Amount',
    },
    {
      key: 'status',
      label: 'Status',
    },
    {
      key: 'actions',
      label: 'Actions',
    },
  ];

  const columns2 = [
    {
      key: 'id',
      label: 'Ticket Number',
    },
    {
      key: 'description',
      label: 'Description',
    },
    {
      key: 'expenseAmount',
      label: 'Amount',
    },
    {
      key: 'status',
      label: 'Status',
    },
  ];

  const handleApprove = async (id) => {
    const updateUrl = `http://localhost:8080/reimbursements/${id}`;
    const updatedReimbursement = { status: 'Approved' };

    try {
      await axios.put(updateUrl, updatedReimbursement);
      fetchReimbursements();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeny = async (id) => {
    const deleteUrl = `http://localhost:8080/reimbursements/delete/${id}`;

    try {
      await axios.delete(deleteUrl);
      fetchReimbursements();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchReimbursements = async () => {
    try {
      const response = await axios.get('http://localhost:8080/reimbursements');
      const data = response.data;
      const pending = data.filter((item) => item.status === 'Pending');
      const approved = data.filter((item) => item.status === 'Approved');
      setPendingReimbursements(pending);
      setApprovedReimbursements(approved);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    fetchReimbursements();
  }, []);

  return (
    <Container>
      <Text
        h1
        size={30}
        css={{
          textGradient: '45deg, $yellow600 -20%, $red600 100%',
        }}
        weight='bold'
      >
        Pending Reimbursements
      </Text>
      <Spacer />
      <Table
        aria-label='Pending Reimbursements Table'
        css={{
          height: 'auto',
          minWidth: '100%',
        }}
      >
        <Table.Header columns={columns}>
          {(column) => (
            <Table.Column key={column.key}>{column.label}</Table.Column>
          )}
        </Table.Header>
        <Table.Body items={pendingReimbursements}>
          {(item) => (
            <Table.Row key={item.id}>
              <Table.Cell>{item.description}</Table.Cell>
              <Table.Cell>{item.expenseAmount}</Table.Cell>
              <Table.Cell>
                <Text color='#ff0000'>{item.status}</Text>
              </Table.Cell>
              <Table.Cell>
                {item.status !== 'Approved' && (
                  <>
                    <div className='flex justify-evenly'>
                      <Button
                        variant='contained'
                        size='small'
                        color='success'
                        onClick={() => handleApprove(item.id)}
                        endIcon={<DoneIcon />}
                      >
                        Approve
                      </Button>

                      <Button
                        variant='contained'
                        size='small'
                        color='error'
                        onClick={() => handleDeny(item.id)}
                        endIcon={<DeleteIcon />}
                      >
                        Deny
                      </Button>
                    </div>
                  </>
                )}
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
      <Spacer y={3} />
      <Text
        h1
        size={30}
        css={{
          textGradient: '45deg, $yellow600 -20%, $red600 100%',
        }}
        weight='bold'
      >
        Approved Reimbursements
      </Text>
      <Spacer />
      <Table
        aria-label='Approved Reimbursements Table'
        css={{
          height: 'auto',
          minWidth: '100%',
        }}
      >
        <Table.Header columns={columns2}>
          {(column) => (
            <Table.Column key={column.key}>{column.label}</Table.Column>
          )}
        </Table.Header>
        <Table.Body items={approvedReimbursements}>
          {(item) => (
            <Table.Row key={item.id}>
              <Table.Cell>{item.id}</Table.Cell>
              <Table.Cell>{item.description}</Table.Cell>
              <Table.Cell>{item.expenseAmount}</Table.Cell>
              <Table.Cell>
                <Text color='success'>{item.status}</Text>
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </Container>
  );
}
