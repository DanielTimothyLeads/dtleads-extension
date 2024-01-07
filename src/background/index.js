import { PERMITTED_URLS } from '../config/constants';

/* global chrome */
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    if (PERMITTED_URLS.some(u => tabs[0].url.startsWith(u))) {
      chrome.tabs.sendMessage(tabs[0].id, request);
    }
  });
  sendResponse({});
});
