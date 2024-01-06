import React, { useContext, useState } from 'react';
import { Button, Select, Stack, Text } from '@mantine/core';
import { DTLEADS_DASHBOARD_URL } from '../../../config/constants';
import { Context as AuthContext } from '../../../providers/AuthProvider';

const AssociationSetup = () => {
  const { state, selectAssociation } = useContext(AuthContext);
  const associationOptions = state.user.associations
    .sort((a, b) => a.name.localeCompare(b.name))
    .map(a => ({
      label: a.name,
      value: a.pkAssociation.toString()
    }));
  const [pkAssociation, setPkAssociation] = useState(
    associationOptions[0]?.value ?? ''
  );

  return (
    <>
      {state.user.associations.length === 0 ? (
        <Stack style={{ alignItems: 'center', textAlign: 'center' }}>
          <Text weight={500}>
            Please onboard an association before continuing
          </Text>

          <Button
            onClick={() => window.open(`${DTLEADS_DASHBOARD_URL}`, '_blank')}
            style={{ width: '100%', maxWidth: 250 }}
            variant="outline"
          >
            Onboard
          </Button>
        </Stack>
      ) : (
        <Stack style={{ width: '100%', maxWidth: 350 }}>
          <Select
            data={associationOptions}
            label="Association"
            onChange={setPkAssociation}
            style={{ flex: 1 }}
            value={pkAssociation}
          />
          <Button color="dark" onClick={() => selectAssociation(pkAssociation)}>
            Continue
          </Button>
        </Stack>
      )}
    </>
  );
};

AssociationSetup.propTypes = {};

export default AssociationSetup;
