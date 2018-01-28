import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default function Row({ children, className }) {
  const cls = classNames(className, 'layout', 'row');
  return <div className={cls}>{children}</div>;
}

Row.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

Row.defaultProps = {
  children: null,
  className: '',
};
