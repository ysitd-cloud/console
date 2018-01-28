import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default function Card({
  children,
  color,
  height,
}) {
  const className = classNames(color, 'card');
  const style = {
    // eslint-disable-next-line no-restricted-globals
    height: isNaN(height) ? height : `${height}px`,
  };

  return <div className={className} style={style}>{children}</div>;
}

Card.propTypes = {
  children: PropTypes.node,
  color: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

Card.defaultProps = {
  children: null,
  color: '',
  height: 'auto',
};
