import React from 'react';
import { MantineProvider } from '@mantine/core';
import ReactDOM from 'react-dom';
import '@webcomponents/custom-elements';
import App from './App';
import { Provider as AuthProvider } from '../providers/AuthProvider';
import { Provider as DashboardProvider } from '../providers/DashboardProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <DashboardProvider>
      <MantineProvider>
        <App />
      </MantineProvider>
    </DashboardProvider>
  </AuthProvider>
);
