import React from 'react';
import { ActionIcon, Group, Title } from '@mantine/core';
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, X } from 'tabler-icons-react';
import { DTLEADS_DASHBOARD_URL } from '../../../config/constants';

const Header = ({ onClose }) => {
  const { key, pathname } = useLocation();
  const navigate = useNavigate();
  return (
    <Group
      style={{
        justifyContent: 'space-between',
        padding: 10,
        height: 52,
        borderBottom: 'solid lightgrey 1px'
      }}
    >
      {key !== 'default' && (
        <ActionIcon color="dark" onClick={() => navigate(-1)} size={22}>
          <ArrowLeft size={45} />
        </ActionIcon>
      )}
      <Group
        onClick={() =>
          window.open(`${DTLEADS_DASHBOARD_URL}${pathname}`, '_blank')
        }
        style={{ gap: 1, cursor: 'pointer' }}
      >
        <Title order={3}>DTLeads Extended</Title>
      </Group>

      {onClose && (
        <ActionIcon color="dark" onClick={onClose} size={22}>
          <X size={45} />
        </ActionIcon>
      )}
    </Group>
  );
};

Header.propTypes = {
  onClose: PropTypes.func
};

export default Header;
