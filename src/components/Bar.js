import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';

export default function Bar({ onSelect }) {
  const handleMenuSelect = (menuItem) => {
    onSelect(menuItem);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static' sx={{ backgroundColor: 'black' }}>
        <Toolbar>
          <Typography
            variant='h6'
            component='div'
            sx={{ flexGrow: 1, textAlign: 'left' }}
          >
            Finance Reimbursement System
          </Typography>
          <MenuItem onClick={() => handleMenuSelect('register')}>
            Register
          </MenuItem>
          <MenuItem onClick={() => handleMenuSelect('login')}>Login</MenuItem>
          <MenuItem onClick={() => handleMenuSelect('reimbursements')}>
            Reimbursements
          </MenuItem>
          <MenuItem onClick={() => handleMenuSelect('status')}>
            Ticket Search
          </MenuItem>
          <MenuItem onClick={() => handleMenuSelect('UpdateStatus')}>
            Update Ticket
          </MenuItem>
          <MenuItem onClick={() => handleMenuSelect('approved')}>
            My Approved Tickets
          </MenuItem>
          <MenuItem onClick={() => handleMenuSelect('pending')}>
            My Pending Tickets
          </MenuItem>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
