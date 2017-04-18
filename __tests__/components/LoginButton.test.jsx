import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import LoginButton from '../../src/components/buttons/LoginButton';

describe('<LoginButton />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = node => shallow(node, { context: { muiTheme } });

  it('matches snapshot', () => {
    const wrapper = shallowWithContext(
      <LoginButton
        href="dummy-link"
      />,
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
