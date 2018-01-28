import React from 'react';
import renderer from 'react-test-renderer';
import Row from './Row';

/* globals describe, expect, it */

describe('React Row Component', () => {
  it('match snapshot', () => {
    const component = renderer.create(<Row>foo</Row>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
