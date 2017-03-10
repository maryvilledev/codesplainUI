import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';

import SaveButton from '../../src/components/buttons/SaveButton';

describe('SaveButton />', () => {
  it('matches snapshot', () => {
    const renderer = ReactTestUtils.createRenderer();
    const tree = renderer.render(
      <SaveButton
        onSaveClick={jest.fn()}
      />
    );
    expect(tree).toMatchSnapshot();
  })
})
