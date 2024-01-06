import React, { useEffect, useState, useContext } from 'react';
import { Button, TextInput, Alert, Stack, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { DTLEADS_DASHBOARD_URL } from '../../../config/constants';
import { Context as AuthContext } from '../../../providers/AuthProvider';
import AppLink from '../../common/AppLink';

const LoginView = () => {
  const navigate = useNavigate();
  const { state, login } = useContext(AuthContext);
  const [formState, setFormState] = useState({
    email: '',
    password: '',
    loading: false,
    error: null
  });

  useEffect(() => {
    setFormState({
      email: state.email ?? '',
      password: '',
      loading: false,
      error: null
    });
  }, []);

  return (
    <Stack
      style={{
        alignSelf: 'stretch',
        justifyContent: 'center',
        placeItems: 'center'
      }}
    >
      <Stack
        component="form"
        onSubmit={e => {
          e.preventDefault();
          setFormState({
            ...formState,
            loading: true,
            error: null
          });
          login(
            formState,
            () => {},
            error => {
              if (error === 'User is not confirmed.') {
                navigate('/auth/confirm-account');
              } else {
                setFormState({
                  ...formState,
                  loading: false,
                  error
                });
              }
            }
          );
        }}
        style={{ flex: 1, maxWidth: 350, width: '100%' }}
      >
        <Text size={'24px'} weight={500}>
          Sign In
        </Text>
        <TextInput
          disabled={formState.loading}
          onChange={e =>
            setFormState({
              ...formState,
              email: e.currentTarget.value
            })
          }
          placeholder="Email"
          required
          type="email"
          value={formState.email}
        />
        <TextInput
          disabled={formState.loading}
          onChange={e =>
            setFormState({
              ...formState,
              password: e.currentTarget.value
            })
          }
          placeholder="Password"
          required
          type="password"
          value={formState.password}
        />
        {formState.error && (
          <Alert color="red" variant="outline">
            <Text>{formState.error}</Text>
          </Alert>
        )}
        <Button color="dark" loading={formState.loading} type="submit">
          Sign In
        </Button>
        <Stack>
          <AppLink
            href={DTLEADS_DASHBOARD_URL}
            style={{
              alignSelf: 'start'
            }}
          >
            Forgot Password?
          </AppLink>
          <AppLink
            href={DTLEADS_DASHBOARD_URL}
            style={{
              alignSelf: 'start'
            }}
          >
            Sign up
          </AppLink>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default LoginView;
