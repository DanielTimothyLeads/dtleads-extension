/* global chrome */
import React from 'react';
import { Box, Stack } from '@mantine/core';
import PropTypes from 'prop-types';

const WarningBanner = ({ warnings }) => {
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
          backgroundColor: '#262626',
          pointerEvents: 'all',
          width: '100vw',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#FFF'
        }}
      >
        {warnings.map(w => w)}
      </Stack>
    </Box>
  );
};

WarningBanner.propTypes = {
  warnings: PropTypes.array
};

export default WarningBanner;
