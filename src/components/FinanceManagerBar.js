import React from 'react';
import { Navbar, Button, Link, Text } from '@nextui-org/react';
import { Box } from './Box.js';
import '/Users/deshondixon/projects/revature/project1frontend/src/App.css';

export default function FinanceManagerBar({ onSelect }) {
  const handleMenuSelect = (menuItem) => {
    onSelect(menuItem);
  };

  return (
    <Box
      css={{
        maxW: '100%',
      }}
    >
      <Navbar isBordered>
        <Navbar.Brand>
          <Text
            h1
            size={30}
            css={{
              textGradient: '45deg, $yellow600 -20%, $red600 100%',
            }}
            weight='bold'
          >
            Finance Manager
          </Text>
        </Navbar.Brand>
        <Navbar.Content hideIn='xs'>
          <div className='flex'>
            <Button light auto onClick={() => handleMenuSelect('status')}>
              Ticket Search
            </Button>
            <Button light auto onClick={() => handleMenuSelect('UpdateStatus')}>
              Update Ticket
            </Button>
          </div>
        </Navbar.Content>

        <Navbar.Content>
          <Button
            bordered
            color='primary'
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
