import React from 'react';
import renderer from 'react-test-renderer';
import Card from './Card';

/* globals describe, expect, it */

describe('React Card Component', () => {
  it('match snapshot', () => {
    const component = renderer.create(<Card color="primary">foo</Card>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
