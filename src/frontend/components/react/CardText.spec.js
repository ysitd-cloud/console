import React from 'react';
import renderer from 'react-test-renderer';
import CardText from './CardText';

/* globals describe, expect, it */

describe('React CardText Component', () => {
  it('match snapshot', () => {
    const component = renderer.create(<CardText className="xs12" id="test">foo</CardText>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
