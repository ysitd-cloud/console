import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default function Flex({ className, children, style }) {
  const classes = classNames('flex', className);
  return <div className={classes} style={style}>{ children }</div>;
}

Flex.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
};

Flex.defaultProps = {
  className: '',
  children: null,
  style: {},
};
