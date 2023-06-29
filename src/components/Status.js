import React, { useState } from 'react';
import {
  Input,
  Spacer,
  Text,
  Container,
  Grid,
  Card,
  Table,
} from '@nextui-org/react';
import Button from '@mui/material/Button';

export default function Status() {
  const [searchText, setSearchText] = useState('');
  const [approvedReimbursements, setApprovedReimbursements] = useState([]);

  const columns = [
    {
      key: 'id',
      label: 'Ticket',
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

  const handleSearch = () => {
    const searchUrl = `http://localhost:8080/reimbursements?search=${encodeURIComponent(
      searchText
    )}`;

    fetch(searchUrl)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.length > 0) {
          setApprovedReimbursements(data);
        } else {
          setApprovedReimbursements([]);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <Spacer />
      <Container>
        <Grid.Container gap={2} justify='center'>
          <Grid>
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
                  Find Ticket
                </Text>
                <Spacer y={2} />
                <Input
                  auto
                  bordered
                  color='secondary'
                  labelPlaceholder='Search Description'
                  placeholder='Enter Description'
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  required
                />
                <Spacer y={1} />
                <Button
                  variant='contained'
                  color='primary'
                  onClick={handleSearch}
                  fullWidth
                >
                  Search
                </Button>
              </Card.Body>
            </Card>
          </Grid>
        </Grid.Container>

        <Spacer y={2} />
        <Table
          aria-label='Reimbursements Table'
          css={{
            width: '100%',
            marginBottom: '20px',
          }}
        >
          <Table.Header columns={columns}>
            {columns.map((column) => (
              <Table.Column key={column.key}>{column.label}</Table.Column>
            ))}
          </Table.Header>
          <Table.Body items={approvedReimbursements}>
            {(item) => (
              <Table.Row key={item.id} style={{ margin: '30px' }}>
                <Table.Cell>{item.id}</Table.Cell>
                <Table.Cell>{item.description}</Table.Cell>
                <Table.Cell>{item.expenseAmount}</Table.Cell>
                <Table.Cell>
                  <Text
                    color={
                      item.status.toLowerCase() === 'pending'
                        ? '#ff0000'
                        : 'success'
                    }
                  >
                    {item.status}
                  </Text>
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </Container>
    </>
  );
}
