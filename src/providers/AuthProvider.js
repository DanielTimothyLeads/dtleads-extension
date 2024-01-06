import { Auth } from '@aws-amplify/auth';
import { Storage } from '@aws-amplify/storage';
import createProvider from './createProvider';
import dtleadsAPI from '../api/dtleadsAPI';
import { AWS_COGNITO_SETTINGS } from '../config/constants';

Auth.configure(AWS_COGNITO_SETTINGS);
Storage.configure(AWS_COGNITO_SETTINGS);

const initialState = {
  email: '',
  isAuthenticated: false,
  isAdmin: false,
  tokenAttempted: false,
  user: null,
  association: null,
  error: null,
  loading: false
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCHING':
      return {
        ...state,
        loading: true,
        error: null,
        ...(action.payload ? action.payload : {})
      };
    case 'SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
        ...action.payload
      };
    case 'ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case 'SELECT-ASSOCIATION':
      return {
        ...state,
        association: state.user?.associations.find(
          a => a.pkAssociation.toString() === action.payload.toString()
        )
      };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};

const tokenLogin = dispatch => async () => {
  try {
    dispatch({ type: 'FETCHING', payload: { tokenAttempted: true } });

    await Auth.currentSession();
    const response = await dtleadsAPI.post('/api/auth/login');
    const pkAssociation = localStorage.getItem('pkAssociation');

    dispatch({
      type: 'SUCCESS',
      payload: {
        isAdmin: response.data.isAdmin,
        user: response.data.user,
        association:
          response.data.user.associations.length === 1
            ? response.data.user.associations[0]
            : pkAssociation
            ? response.data.user.associations.find(
                a => a.pkAssociation.toString() === pkAssociation.toString()
              )
            : null,
        isAuthenticated: true,
        tokenAttempted: true
      }
    });
  } catch (e) {
    dispatch({
      type: 'ERROR',
      payload: null
    });
  }
};

const login =
  dispatch =>
  async ({ email, password }, onSuccessCallback, onErrorCallback) => {
    try {
      dispatch({
        type: 'SUCCESS',
        payload: {
          email
        }
      });
      await Auth.signIn(email.trim(), password.trim());
      const response = await dtleadsAPI.post('/api/auth/login');
      const pkAssociation = localStorage.getItem('pkAssociation');

      dispatch({
        type: 'SUCCESS',
        payload: {
          isAdmin: response.data.isAdmin,
          user: response.data.user,
          association:
            response.data.user.associations.length === 1
              ? response.data.user.associations[0]
              : pkAssociation
              ? response.data.user.associations.find(
                  a => a.pkAssociation.toString() === pkAssociation.toString()
                )
              : null,
          isAuthenticated: true,
          tokenAttempted: true
        }
      });
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    } catch (error) {
      let errorMessage = '';
      switch (error.message) {
        case 'Incorrect username or password.':
          errorMessage = 'Incorrect email or password.';
          break;
        case 'User is not confirmed.':
          errorMessage = 'User is not confirmed.';
          break;
        default:
          errorMessage = 'Oops something went wrong';
          break;
      }
      if (onErrorCallback) {
        onErrorCallback(errorMessage);
      }
      dispatch({ type: 'ERROR', payload: error });
    }
  };

const logout = dispatch => async () => {
  try {
    await Auth.signOut();
    window.localStorage.removeItem('pkAssociation');
    dispatch({ type: 'RESET' });
  } catch (error) {
    dispatch({ type: 'ERROR', payload: error });
  }
};

const selectAssociation = dispatch => async pkAssociation => {
  dispatch({
    type: 'SELECT-ASSOCIATION',
    payload: pkAssociation
  });
  window.localStorage.setItem('pkAssociation', pkAssociation.toString());
};

export const { Provider, Context } = createProvider(
  reducer,
  {
    login,
    logout,
    selectAssociation,
    tokenLogin
  },
  initialState
);
