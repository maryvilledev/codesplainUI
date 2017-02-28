import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import SaveButton from '../../src/components/SaveButton';

describe('Save />', () => {
  it('matches snapshot', () => {
    const renderer = ReactTestUtils.createRenderer();
    const tree = renderer.render(
      <SaveButton />
    );
    expect(tree).toMatchSnapshot();
  })
})
