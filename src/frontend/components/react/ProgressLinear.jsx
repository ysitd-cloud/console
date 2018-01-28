import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

function ProgressLinearBar({
  active, indeterminate, bufferValue, children,
}) {
  const classNames = classnames('progress-linear__bar');
  const style = {};

  if (!active) {
    style.height = 0;
  }

  if (!indeterminate && bufferValue !== 100) {
    style.width = `${this.bufferValue}%`;
  }

  return <div className={classNames} style={style}>{children}</div>;
}

ProgressLinearBar.propTypes = {
  active: PropTypes.bool.isRequired,
  indeterminate: PropTypes.bool.isRequired,
  bufferValue: PropTypes.number.isRequired,
  children: PropTypes.node,
};

ProgressLinearBar.defaultProps = {
  children: null,
};

function ProgressLinearBackground({
  active, color, backgroundColor, backgroundOpacity, bufferValue,
}) {
  const classNames = classnames(backgroundColor || color, 'progress-linear__background');

  let opacity = backgroundOpacity;
  if (opacity === null) {
    opacity = backgroundColor ? 1 : 0.3;
  }

  const style = {
    opacity,
    height: active ? 'auto' : 0,
    width: `${bufferValue}%`,
  };

  return (
    <div className={classNames} style={style} />
  );
}

ProgressLinearBackground.propTypes = {
  active: PropTypes.bool.isRequired,
  color: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string,
  backgroundOpacity: PropTypes.number,
  bufferValue: PropTypes.number.isRequired,
};

ProgressLinearBackground.defaultProps = {
  backgroundOpacity: null,
  backgroundColor: null,
};

function Indeterminate({ color }) {
  return (
    <div className="progress-linear__bar__indeterminate progress-linear__bar__indeterminate--active">
      <div className={classnames('progress-linear__bar__indeterminate', 'long', color)} />
      <div className={classnames('progress-linear__bar__indeterminate', 'short', color)} />
    </div>
  );
}

Indeterminate.propTypes = {
  color: PropTypes.string.isRequired,
};

function Determinate({ color, width }) {
  const style = {
    width: `${width}%`,
  };

  return (
    <div className={classnames('progress-linear__bar__determinate', color)} style={style} />
  );
}

Determinate.propTypes = {
  color: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
};

export default function ProgressLinear({
  active,
  bufferValue,
  height,
  color,
  indeterminate,
  backgroundColor,
  backgroundOpacity,
  value,
}) {
  const style = {
    height: `${height}px`,
  };
  const classNames = 'progress-linear__bar';

  // eslint-disable-next-line no-mixed-operators
  const effectiveWidth = bufferValue ? (value * 100 / bufferValue) : 0;

  return (
    <div className={classNames} style={style}>
      <ProgressLinearBackground
        active={active}
        bufferValue={bufferValue}
        color={color}
        backgroundColor={backgroundColor}
        backgroundOpacity={backgroundOpacity}
      />
      <ProgressLinearBar
        active={active}
        indeterminate={indeterminate}
        bufferValue={bufferValue}
      >
        {indeterminate && <Indeterminate color={color} />}
        {!indeterminate && <Determinate color={color} width={effectiveWidth} />}
      </ProgressLinearBar>
    </div>
  );
}

ProgressLinear.propTypes = {
  height: PropTypes.number,
  color: PropTypes.string,
  backgroundColor: PropTypes.string,
  backgroundOpacity: PropTypes.number,
  bufferValue: PropTypes.number,
  active: PropTypes.bool,
  indeterminate: PropTypes.bool,
  value: PropTypes.number,
};

ProgressLinear.defaultProps = {
  height: 7,
  color: 'primary',
  backgroundColor: null,
  backgroundOpacity: null,
  bufferValue: 100,
  active: true,
  indeterminate: false,
  value: 0,
};
