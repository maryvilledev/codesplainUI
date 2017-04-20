import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import LoginButton from '../../src/components/buttons/LoginButton';

const defaultProps = {
  onClick: jest.fn(),
};

describe('<LoginButton />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = node => shallow(node, { context: { muiTheme } });

  it('matches snapshot', () => {
    const wrapper = shallowWithContext(<LoginButton {...defaultProps} />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
