import React from 'react';
import { Navbar, Button, Link, Text } from '@nextui-org/react';
import { Box } from './Box.js';
import '/Users/deshondixon/projects/revature/project1frontend/src/App.css';

export default function EmployeeBar({ onSelect }) {
  const handleMenuSelect = (menuItem) => {
    onSelect(menuItem);
  };

  return (
    <Box
      css={{
        maxW: '100%',
      }}
    >
      <Navbar
        isBordered
        variant='floating'
        css={{
          $$navbarBackgroundColor: 'transparent',
          $$navbarBlurBackgroundColor: 'transparent',
        }}
      >
        <Navbar.Brand>
          <Text
            h1
            size={30}
            css={{
              textGradient: '45deg, $yellow600 -20%, $red600 100%',
            }}
            weight='bold'
          >
            Employee
          </Text>
        </Navbar.Brand>
        <Navbar.Content enableCursorHighlight variant='underline'>
          <div className='flex'>
            <Button
              light
              auto
              onClick={() => handleMenuSelect('reimbursements')}
            >
              Submit a Ticket
            </Button>
            <Button light auto onClick={() => handleMenuSelect('status')}>
              Ticket Search
            </Button>
            <Button light auto onClick={() => handleMenuSelect('approved')}>
              My Approved Tickets
            </Button>
            <Button light auto onClick={() => handleMenuSelect('pending')}>
              My Pending Tickets
            </Button>
          </div>
        </Navbar.Content>

        <Navbar.Content enableCursorHighlight variant='underline'>
          <Button
            bordered
            auto
            as={Link}
            onClick={() => handleMenuSelect('login')}
            css={{
              padding: '10px 20px',
              fontSize: '18px',
            }}
          >
            HOME
          </Button>
        </Navbar.Content>
      </Navbar>
    </Box>
  );
}
