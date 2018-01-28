import React from 'react';
import renderer from 'react-test-renderer';
import ProgressLinear from './ProgressLinear';

/* globals describe, expect, it */

describe('React ProgressLinear Component', () => {
  it('match snapshot', () => {
    const component = renderer.create(<ProgressLinear indeterminate />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
