import React, { useState } from 'react';
import Bar from './components/Bar';
import Employee from './components/Employee';
import Login from './components/Login';

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
        {selectedMenu === 'register' ? <Employee /> : null}
        {selectedMenu === 'login' ? <Login /> : null}
      </div>
    </>
  );
}
