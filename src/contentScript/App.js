/* global chrome */
import React, { useState } from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
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
  const [tabContentState, setTabContentState] = useState({
    isOpen: false
  });

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'open_tab') {
      setTabContentState(c => ({
        ...c,
        isOpen: true
      }));
    }
    return true;
  });

  return (
    <Router initialEntries={[initalLocation]}>
      <TabContentModal
        isOpen={tabContentState.isOpen}
        onToggle={() =>
          setTabContentState({
            ...tabContentState,
            isOpen: !tabContentState.isOpen
          })
        }
      />
    </Router>
  );
};

export default App;
