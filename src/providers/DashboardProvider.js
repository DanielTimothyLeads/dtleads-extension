import createProvider from './createProvider';
import { getReducer } from './reducer';
import dtleadsAPI from '../api/dtleadsAPI';

const initialState = {};

const getErrorMessage = error => {
  if (error.response?.status === 409) {
    return error.response?.data?.error ?? 'Unknown Error.';
  }
  return 'Unknown Error.';
};

export const { Provider, Context } = createProvider(
  getReducer(initialState),
  {},
  initialState
);
