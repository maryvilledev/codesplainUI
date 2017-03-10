import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';

import Alert from '../../src/components/Alert';

describe('<Alert />', () => {
  it('matches the stored snapshot', () => {
    const renderer = ReactTestUtils.createRenderer();
    const tree = renderer.render(
      <Alert />
    );
    expect(tree).toMatchSnapshot();
  });
});
