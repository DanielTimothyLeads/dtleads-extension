import React, { useContext, useEffect, useRef } from 'react';
import {
  MemoryRouter as Router,
  Route,
  Routes,
  Navigate
} from 'react-router-dom';
import TabContentModal from '../components/common/TabContentModal';
import ContentScriptLogin from '../components/content/auth/ContentScriptLogin';
import { Context as AuthContext } from '../providers/AuthProvider';

const getInitialLocation = pathname => {
  const splitUrl = (
    pathname.startsWith('/') ? pathname.substring(1) : pathname
  ).split('/');

  const initialUrl = '/';
  switch (splitUrl[0]) {
    default:
      break;
  }
  return initialUrl;
};

const App = () => {
  const hasAttemptedToken = useRef(false);
  const { state, tokenLogin } = useContext(AuthContext);
  const initalLocation = getInitialLocation(window.location.pathname);
  const showAuthView = !state.isAuthenticated || !state.association;
  const isLoading = !hasAttemptedToken.current || state.loading;

  useEffect(() => {
    if (!state.tokenAttempted) {
      tokenLogin();
      hasAttemptedToken.current = true;
    }
  }, []);

  return (
    !isLoading && (
      <Router initialEntries={[initalLocation]}>
        {showAuthView ? (
          <ContentScriptLogin />
        ) : (
          <TabContentModal>
            <Routes>
              <Route element={<></>} path="/" />
              <Route element={<Navigate replace to="/" />} path="*" />
            </Routes>
          </TabContentModal>
        )}
      </Router>
    )
  );
};

export default App;
