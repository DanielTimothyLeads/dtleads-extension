import React from 'react';
import { createEmotionCache, MantineProvider } from '@mantine/core';
import ReactDOM from 'react-dom';
import '@webcomponents/custom-elements';
import App from './App';
import { Provider as AuthProvider } from '../providers/AuthProvider';
import { Provider as DashboardProvider } from '../providers/DashboardProvider';

const element = document.createElement('div');
const shadowRoot = element.attachShadow({ mode: 'open' });
const mountPoint = document.createElement('div');
const emotionRoot = document.createElement('div');

shadowRoot.appendChild(mountPoint);
shadowRoot.appendChild(emotionRoot);

document.body.appendChild(element);

const myCache = createEmotionCache({ key: 'mantine', container: shadowRoot });

const root = ReactDOM.createRoot(mountPoint);
root.render(
  <AuthProvider>
    <DashboardProvider>
      <MantineProvider
        emotionCache={myCache}
        theme={{
          components: {
            Portal: {
              defaultProps: {
                target: emotionRoot
              }
            }
          }
        }}
      >
        <App />
      </MantineProvider>
    </DashboardProvider>
  </AuthProvider>
);
