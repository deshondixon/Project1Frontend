import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createTheme, NextUIProvider } from '@nextui-org/react';

const theme = createTheme({
  type: 'dark',
  theme: {
    colors: {
      primary: '#4ADE7B',
      secondary: '#F9CB80',
      error: '#FCC5D8',
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <React.StrictMode basename='/project1frontend'>
      <NextUIProvider theme={theme}>
        <App />
      </NextUIProvider>
    </React.StrictMode>
  </>
);

reportWebVitals();
