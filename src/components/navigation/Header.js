import React from 'react';
import { ActionIcon, Group, Title } from '@mantine/core';
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Leaf, X } from 'tabler-icons-react';
import { DTLEADS_DASHBOARD_URL } from '../../config/constants';

const Header = ({ onClose }) => {
  const { key, pathname } = useLocation();
  const navigate = useNavigate();
  return (
    <Group style={{ justifyContent: 'space-between', padding: 10 }}>
      {key !== 'default' && (
        <ActionIcon color="dark" onClick={() => navigate(-1)} size={22}>
          <ArrowLeft size={22} />
        </ActionIcon>
      )}
      <Group
        onClick={() =>
          window.open(`${DTLEADS_DASHBOARD_URL}${pathname}`, '_blank')
        }
        style={{ gap: 1, cursor: 'pointer' }}
      >
        <Leaf color="dodgerblue" size={22} />
        <Title order={5}>DTLeads Extended</Title>
      </Group>

      {onClose && (
        <ActionIcon color="dark" onClick={onClose} size={22}>
          <X size={22} />
        </ActionIcon>
      )}
    </Group>
  );
};

Header.propTypes = {
  onClose: PropTypes.func
};

export default Header;
