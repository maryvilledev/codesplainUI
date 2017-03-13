import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import LockButton from '../../src/components/buttons/LockButton';

describe('LockButton />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = (node) => shallow(node, { context: { muiTheme } });

  it('matches snapshot of when the app is not in read-only mode', () => {
    const wrapper = shallowWithContext(
      <LockButton
        onClick={jest.fn()}
        readOnly={false}
      />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('matches snapshot of when the app is in read-only mode', () => {
    const wrapper = shallowWithContext(
      <LockButton
        onClick={jest.fn()}
        readOnly={true}
      />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
})
