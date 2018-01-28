import React from 'react';
import renderer from 'react-test-renderer';
import { Page } from './Page';

/* globals describe, expect, it, jest */

describe('React Card Component', () => {
  it('loading match snapshot', () => {
    const data = {
      loading: true,
      error: null,
      refetch: jest.fn(),
      fetchMore: jest.fn(),
      updateQuery: jest.fn(),
    };
    const component = renderer.create(<Page data={data} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('ready match snapshot', () => {
    const data = {
      loading: false,
      error: null,
      refetch: jest.fn(),
      fetchMore: jest.fn(),
      updateQuery: jest.fn(),
      user: {
        username: 'foobar',
        displayName: 'foo',
        avatarUrl: 'bar.jpg',
      },
    };
    const component = renderer.create(<Page data={data} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
