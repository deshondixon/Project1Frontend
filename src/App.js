import React, { useState } from 'react';
import Bar from './components/Bar';
import Register from './components/Register';
import Login from './components/Login';
import Reimbursement from './components/Reimbursement';
import Status from './components/Status';
import UpdateStatus from './components/UpdateStatus';
import Approved from './components/Approved';
import Pending from './components/Pending';
import './App.css';

export default function App() {
  const [selectedMenu, setSelectedMenu] = useState('login');

  const handleMenuSelect = (menuItem) => {
    setSelectedMenu(menuItem);
  };

  return (
    <>
      <div>
        <Bar onSelect={handleMenuSelect} />
      </div>
      <div className='flex justify-center p-12'>
        {selectedMenu === 'register' ? <Register /> : null}
        {selectedMenu === 'login' ? <Login /> : null}
        {selectedMenu === 'reimbursements' ? <Reimbursement /> : null}
        {selectedMenu === 'status' ? <Status /> : null}
        {selectedMenu === 'UpdateStatus' ? <UpdateStatus /> : null}
        {selectedMenu === 'approved' ? <Approved /> : null}
        {selectedMenu === 'pending' ? <Pending /> : null}
      </div>
    </>
  );
}
