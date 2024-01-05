import React from 'react';
import { MantineProvider } from '@mantine/core';
import ReactDOM from 'react-dom';
import '@webcomponents/custom-elements';
import App from './App';
import { Provider as DashboardProvider } from '../providers/DashboardProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <DashboardProvider>
    <MantineProvider>
      <App />
    </MantineProvider>
  </DashboardProvider>
);
