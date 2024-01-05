import { Auth } from '@aws-amplify/auth';
import axios from 'axios';
import { PRODUCTION } from '../config/constants';

const dtleadsAPI = axios.create({
  baseURL: PRODUCTION
    ? 'https://api.danieltimothyleads.com'
    : 'https://localhost:7227'
});

dtleadsAPI.interceptors.request.use(
  async config => {
    try {
      const token = (await Auth.currentSession()).getIdToken().getJwtToken();
      if (token) {
        config.headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        };
      }
    } catch {}
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

export default dtleadsAPI;
