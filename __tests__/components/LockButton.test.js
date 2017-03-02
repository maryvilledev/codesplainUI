import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';

import LockButton from '../../src/components/LockButton';

describe('LockButton />', () => {
  it('matches snapshot of when the app is not in read-only mode', () => {
    const renderer = ReactTestUtils.createRenderer();
    const tree = renderer.render(
      <LockButton
        onClick={jest.fn()}
        readOnly={false}
      />
    );
    expect(tree).toMatchSnapshot();
  });
  it('matches snapshot of when the app is in read-only mode', () => {
    const renderer = ReactTestUtils.createRenderer();
    const tree = renderer.render(
      <LockButton
        onClick={jest.fn()}
        readOnly={true}
      />
    );
    expect(tree).toMatchSnapshot();
  });
})
