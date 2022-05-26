import React from 'react';
import './index.css';
import App from './App';
import {AuthContextProvider} from './context/AuthContext';
import { createRoot } from 'react-dom/client';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic'


const container = document.getElementById('root');
const root = createRoot(container);

const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE
}

root.render(
  <React.StrictMode>
    <AuthContextProvider>
    <AlertProvider template={AlertTemplate} {...options}>
    <App />
    </AlertProvider>
    </AuthContextProvider>
  </React.StrictMode>,
);

