import * as React from 'react';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { Table, Spacer, Text } from '@nextui-org/react';

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
      .then((data) => {
        const pending = data.filter((item) => item.status === 'Pending');
        const approved = data.filter((item) => item.status === 'Approved');
        setPendingReimbursements(pending);
        setApprovedReimbursements(approved);
      })
      .catch((error) => console.log(error));
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
                <Text color='warning'>{item.status}</Text>
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
                      >
                        Approve
                      </Button>

                      <Button
                        variant='contained'
                        size='small'
                        color='error'
                        onClick={() => handleDeny(item.id)}
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
