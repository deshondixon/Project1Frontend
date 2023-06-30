import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme, NextUIProvider } from '@nextui-org/react';
import './index.css';
import App from './App';
import FinanceManager from './components/FinanceManager';
import Employee from './components/Employee';
import reportWebVitals from './reportWebVitals';
import { createRoot } from 'react-dom/client';
import Register from './components/Register';

const theme = createTheme({
  type: 'dark',
  theme: {
    colors: {
      primary: '#4ADE7B',
      secondary: '#F9CB80',
      error: '#FCC5D8',
      // background: '#D80073',
    },
  },
});

const rootElement = document.getElementById('root');

createRoot(rootElement).render(
  <NextUIProvider theme={theme}>
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path='/' element={<App />} />
          <Route path='/finance-manager' element={<FinanceManager />} />
          <Route path='/employee' element={<Employee />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </Router>
    </React.StrictMode>
  </NextUIProvider>
);

reportWebVitals();
