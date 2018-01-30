import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export default function CardTitle(props) {
  const { className, children, ...other } = props
  const classes = classNames(className, 'card__title');
  return <div className={classes} {...other}>{children}</div>;
}

CardTitle.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

CardTitle.defaultProps = {
  className: '',
  children: null,
};
