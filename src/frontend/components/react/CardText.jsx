import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default function CardText(props) {
  const { className, children, ...others } = props;
  const classes = classNames(className, 'card__text');
  return <div className={classes} {...others}>{children}</div>;
}

CardText.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

CardText.defaultProps = {
  className: '',
  children: null,
};
