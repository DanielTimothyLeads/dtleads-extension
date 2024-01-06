import React, { useContext, useState } from 'react';
import { Text, Group, Modal } from '@mantine/core';
import LoginView from './LoginView';
import { Context as AuthContext } from '../../../providers/AuthProvider';
import WarningBanner from '../../common/WarningBanner';
import AssociationSetup from '../association/AssociationSetup';

const ContentScriptLogin = () => {
  const { state } = useContext(AuthContext);
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <>
      <WarningBanner
        warnings={[
          <Group key="1" style={{ gap: 5 }}>
            <Text style={{ fontSize: 14 }}>
              It looks like you're signed out of DTLeads.
            </Text>
            <Text
              onClick={() => setShowLoginModal(true)}
              style={{
                fontSize: 14,
                textDecoration: 'underline',
                cursor: 'pointer'
              }}
              weight={500}
            >
              Sign In.
            </Text>
          </Group>
        ]}
      />

      <Modal
        centered
        onClose={() => setShowLoginModal(true)}
        opened={showLoginModal}
        size={400}
      >
        {state.isAuthenticated ? <AssociationSetup /> : <LoginView />}
      </Modal>
    </>
  );
};

export default ContentScriptLogin;
