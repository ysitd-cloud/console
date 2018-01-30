import React from 'react';
import renderer from 'react-test-renderer';
import CardTitle from './CardTitle';

/* globals describe, expect, it */

describe('React CardTitle Component', () => {
  it('match snapshot', () => {
    const component = renderer.create(<CardTitle className="xs12">foo</CardTitle>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
