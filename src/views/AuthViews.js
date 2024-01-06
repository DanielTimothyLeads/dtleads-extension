import React, { useContext, useEffect } from 'react';
import { Stack, Group, Title, Image } from '@mantine/core';
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate
} from 'react-router-dom';
import AssociationSetup from '../components/content/association/AssociationSetup';
import LoginView from '../components/content/auth/LoginView';
import dtleadsLogoImage from '../images/dtleads-logo.png';
import { Context as AuthContext } from '../providers/AuthProvider';

const AuthViews = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const { state } = useContext(AuthContext);
  const redirectUrl = new URLSearchParams(search).get('redirectUrl');

  useEffect(() => {
    if (state.isAuthenticated && (state.association || redirectUrl)) {
      navigate(redirectUrl ?? '/');
    }
  }, [state.isAuthenticated]);

  return (
    <Stack style={{ flex: 1 }}>
      <Stack style={{ flex: 1, gap: 0 }}>
        <Stack
          style={{
            flex: 1,
            textAlign: 'center',
            backgroundColor: '#262626',
            alignSelf: 'stretch',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20
          }}
        >
          <Stack>
            <Group style={{ gap: 10 }}>
              <Image height={50} src={dtleadsLogoImage} width={50} />
              <Title
                color="#FFF"
                order={2}
                style={{ fontSize: 24 }}
                weight={'normal'}
              >
                <b>Daniel Timothy</b> Leads.
              </Title>
            </Group>
          </Stack>
        </Stack>
        <Stack
          style={{
            flex: 3,
            alignSelf: 'stretch',
            justifyContent: 'start',
            alignItems: 'center',
            padding: 20
          }}
        >
          <Stack style={{ backgroundColor: '#262626' }}></Stack>
          {state.isAuthenticated ? (
            <Routes>
              <Route element={<AssociationSetup />} path="/association" />
              <Route
                element={<Navigate replace to="/auth/association" />}
                path="*"
              />
            </Routes>
          ) : (
            <Routes>
              <Route element={<LoginView />} path="/login" />
              <Route element={<Navigate replace to="/auth/login" />} path="*" />
            </Routes>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default AuthViews;
