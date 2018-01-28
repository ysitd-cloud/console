import React from 'react';
import renderer from 'react-test-renderer';
import Flex from './Flex';

/* globals describe, expect, it */

describe('React Flex Component', () => {
  it('match snapshot', () => {
    const component = renderer.create(<Flex className="xs12">foo</Flex>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
