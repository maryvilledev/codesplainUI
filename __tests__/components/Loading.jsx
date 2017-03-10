import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';

import Loading from '../../src/components/Loading';

describe('<Loading />', () => {
  it('matches the stored snapshot', () => {
    const renderer = ReactTestUtils.createRenderer();
    const tree = renderer.render(
      <Loading />
    );
    expect(tree).toMatchSnapshot();
  });
});
