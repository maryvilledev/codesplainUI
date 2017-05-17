import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import ConfirmationDialog from '../../src/components/ConfirmationDialog';

const mockFunctionProps = {
  accept: jest.fn(),
  reject: jest.fn(),
};

describe('<ConfirmationDialog />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = node => shallow(node, { context: { muiTheme } });

  it('matches snapshot when it is open', () => {
    const wrapper = shallowWithContext(
      <ConfirmationDialog
        isOpen
        {...mockFunctionProps}
      />,
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when it is closed', () => {
    const wrapper = shallowWithContext(
      <ConfirmationDialog
        isOpen={false}
        {...mockFunctionProps}
      />,
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
