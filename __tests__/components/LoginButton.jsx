import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';

import LoginButton from '../../src/components/buttons/LoginButton';

describe('<LoginButton />', () => {
  it('matches the stored snapshot', () => {
    const renderer = ReactTestUtils.createRenderer();
    const tree = renderer.render(
      <LoginButton href='dummy-link' />
    );
    expect(tree).toMatchSnapshot();
  });
});
