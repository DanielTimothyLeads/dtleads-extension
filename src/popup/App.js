import React from 'react';
import { Divider, Stack } from '@mantine/core';
import {
  MemoryRouter as Router,
  Navigate,
  Route,
  Routes
} from 'react-router-dom';
import Header from '../components/navigation/Header';

const App = () => {
  return (
    <Router>
      <Stack
        style={{ flex: 1, width: 360, height: 600, gap: 0, overflow: 'hidden' }}
      >
        <Header />
        <Divider />
        <Stack style={{ padding: 10, flex: 1, overflow: 'auto' }}>
          <Routes>
            <Route element={<></>} path="/" />
            <Route element={<Navigate replace to="/" />} path="*" />
          </Routes>
        </Stack>
      </Stack>
    </Router>
  );
};

export default () => <App />;
