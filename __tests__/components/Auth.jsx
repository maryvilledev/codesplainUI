import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';

import Auth from '../../src/components/Auth';

describe('<Auth />', () => {
  it('matches the stored snapshot', () => {
    const renderer = ReactTestUtils.createRenderer();
    const tree = renderer.render(
      <Auth />
    );
    expect(tree).toMatchSnapshot();
  });
});
