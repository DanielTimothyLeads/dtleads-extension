import React from 'react';
import { Box, Button, Card, Group, Stack } from '@mantine/core';
import PropTypes from 'prop-types';
import { ChevronLeft, X } from 'tabler-icons-react';
import {
  DTLEADS_DASHBOARD_URL,
  DTLEADS_DASHBOARD_URL_LOCAL,
  PRODUCTION
} from '../../config/constants';

const TabContentModal = ({ isOpen, onToggle }) => {
  return (
    <Box
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 99,
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
        <Group style={{ flex: 1, gap: 0 }}>
          <Button.Group orientation="vertical" style={{ pointerEvents: 'all' }}>
            {isOpen ? (
              <>
                <Button
                  onClick={onToggle}
                  style={{
                    backgroundColor: '#3c3c3c',
                    padding: 0,
                    width: 40,
                    height: 50
                  }}
                  variant="default"
                >
                  <X color="#FFF" />
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={onToggle}
                  style={{
                    backgroundColor: '#3c3c3c',
                    padding: 0,
                    width: 40,
                    height: 50
                  }}
                  variant="default"
                >
                  <ChevronLeft color="#FFF" />
                </Button>
              </>
            )}
          </Button.Group>
          <Card
            shadow="xl"
            style={{
              pointerEvents: 'all',
              padding: 0,
              borderRadius: 0,
              width: 450,
              height: '100%',
              display: isOpen ? 'flex' : 'none'
            }}
          >
            <iframe
              allow="autoplay;microphone;clipboard-write;camera;fullscreen;"
              src={
                PRODUCTION ? DTLEADS_DASHBOARD_URL : DTLEADS_DASHBOARD_URL_LOCAL
              }
              style={{
                margin: 0,
                padding: 0,
                border: 'none',
                width: '100%',
                height: '100%'
              }}
              title="DTLeads"
            />
          </Card>
        </Group>
      </Stack>
    </Box>
  );
};

TabContentModal.propTypes = {
  isOpen: PropTypes.any,
  onToggle: PropTypes.any
};

export default TabContentModal;
