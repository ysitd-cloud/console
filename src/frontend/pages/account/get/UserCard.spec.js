import React from 'react';
import renderer from 'react-test-renderer';
import UserCard from './UserCard';

/* globals describe, expect, it */

describe('React Card Component', () => {
  it('match snapshot', () => {
    const component = renderer.create(<UserCard avatarUrl="foo.jpg" displayName="bar" username="foobar" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
