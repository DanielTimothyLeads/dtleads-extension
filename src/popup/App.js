/* global chrome */
import React from 'react';

const App = () => {
  chrome.runtime.sendMessage({ type: 'open_tab' });
  window.close();

  return <></>;
};

export default () => <App />;
