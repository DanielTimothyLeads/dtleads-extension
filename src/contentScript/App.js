import React from 'react';
import {
  MemoryRouter as Router,
  Route,
  Routes,
  Navigate
} from 'react-router-dom';
import TabContentModal from '../components/common/TabContentModal';

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
  const initalLocation = getInitialLocation(window.location.pathname);
  return (
    <Router initialEntries={[initalLocation]}>
      <TabContentModal>
        <Routes>
          <Route element={<></>} path="/" />
          <Route element={<Navigate replace to="/" />} path="*" />
        </Routes>
      </TabContentModal>
    </Router>
  );
};

export default App;
