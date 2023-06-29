import React, { useState } from 'react';
import FinanceManagerBar from '/Users/deshondixon/projects/revature/project1frontend/src/components/FinanceManagerBar.js';
import Register from '/Users/deshondixon/projects/revature/project1frontend/src/components/Register.js';
import Login from '/Users/deshondixon/projects/revature/project1frontend/src/components/Login.js';
import Reimbursement from '/Users/deshondixon/projects/revature/project1frontend/src/components/Reimbursement.js';
import Status from '/Users/deshondixon/projects/revature/project1frontend/src/components/Status.js';
import UpdateStatus from '/Users/deshondixon/projects/revature/project1frontend/src/components/UpdateStatus.js';
import Approved from '/Users/deshondixon/projects/revature/project1frontend/src/components/Approved.js';
import Pending from '/Users/deshondixon/projects/revature/project1frontend/src/components/Pending.js';
import '/Users/deshondixon/projects/revature/project1frontend/src/App.css';

export default function FinanceManager() {
  const [selectedMenu, setSelectedMenu] = useState('login');

  const handleMenuSelect = (menuItem) => {
    setSelectedMenu(menuItem);
  };

  return (
    <>
      <div>
        <FinanceManagerBar onSelect={handleMenuSelect} />
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
