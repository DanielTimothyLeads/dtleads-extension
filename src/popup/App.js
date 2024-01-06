/* global chrome */
import React, { useContext, useEffect, useRef } from 'react';
import '../styles/globalStyles.module.css';
import { Divider, Loader, Stack } from '@mantine/core';
import {
  MemoryRouter as Router,
  Navigate,
  Route,
  Routes
} from 'react-router-dom';
import Header from '../components/content/navigation/Header';
import { Context as AuthContext } from '../providers/AuthProvider';
import AuthViews from '../views/AuthViews';

const App = () => {
  const hasAttemptedToken = useRef(false);
  const { state, tokenLogin } = useContext(AuthContext);
  const showAuthView = !state.isAuthenticated || !state.association;
  const isLoading = !hasAttemptedToken.current || state.loading;

  useEffect(() => {
    if (!state.tokenAttempted) {
      tokenLogin();
      hasAttemptedToken.current = true;
    }
  }, []);

  return (
    <Router>
      <Stack
        style={{ flex: 1, width: 360, height: 600, gap: 0, overflow: 'hidden' }}
      >
        {isLoading ? (
          <Stack
            style={{ flex: 1, placeItems: 'center', justifyContent: 'center' }}
          >
            <Loader color="dark" />
          </Stack>
        ) : showAuthView ? (
          <Routes>
            <Route element={<AuthViews />} path="/auth/*" />
            <Route element={<Navigate replace to="/auth/login" />} path="*" />
          </Routes>
        ) : (
          <>
            <Header />
            <Divider />
            <Stack style={{ padding: 10, flex: 1, overflow: 'auto' }}>
              <Routes>
                <Route element={<>hello</>} path="/" />
                <Route element={<Navigate replace to="/" />} path="*" />
              </Routes>
            </Stack>
          </>
        )}
      </Stack>
    </Router>
  );
};

export default () => <App />;
