import React from 'react';
import { Text } from '@mantine/core';
import { useHover } from '@mantine/hooks';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const AppLink = ({ disabled, to, href, children, ...rest }) => {
  const { hovered, ref } = useHover();

  return (
    <Text
      ref={ref}
      {...rest}
      component={disabled || !to ? null : Link}
      onClick={() => {
        if (href) {
          window.open(href, '_blank');
        }
      }}
      style={{
        ...(!disabled && hovered && (to || href)
          ? { textDecoration: 'underline', cursor: 'pointer' }
          : {}),
        ...rest.style
      }}
      to={to}
    >
      {children}
    </Text>
  );
};

AppLink.propTypes = {
  children: PropTypes.any,
  disabled: PropTypes.bool,
  href: PropTypes.string,
  to: PropTypes.string
};

export default AppLink;
