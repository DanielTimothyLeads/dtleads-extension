import React from 'react';
import { Box, Card, Stack } from '@mantine/core';
import PropTypes from 'prop-types';
import Header from '../content/navigation/Header';

const TabContentModal = ({ children }) => {
  return (
    <Box
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 999999999,
        pointerEvents: 'none'
      }}
    >
      <Stack
        style={{
          flex: 1,
          alignItems: 'end',
          height: '100%'
        }}
      >
        <Stack style={{ flex: 1 }}>
          <Card
            onClick={e => {}}
            shadow="xl"
            style={{
              pointerEvents: 'all',
              padding: 0,
              border: 'solid 1px #FFF',
              borderRadius: 10,
              width: 400,
              height: '100%'
            }}
          >
            <Stack style={{ flex: 1, gap: 0, height: '100%' }}>
              <Header onClose={() => {}} />
              <Stack style={{ padding: 10, flex: 1, overflow: 'auto' }}>
                {children}
              </Stack>
            </Stack>
          </Card>
        </Stack>
      </Stack>
    </Box>
  );
};

TabContentModal.propTypes = {
  children: PropTypes.any
};

export default TabContentModal;
