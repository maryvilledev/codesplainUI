import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import EnhancedDeleteButton, {
  DeleteButton,
} from '../../src/components/buttons/DeleteButton';

const defaultProps = {
  onClick: jest.fn(),
  snippetKey: 'snippetKey',
  isEnabled: false,
};

describe('<DeleteButton />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = node => shallow(node, { context: { muiTheme } });

  it('matches snapshot', () => {
    const wrapper = shallowWithContext(
      <DeleteButton
        {...defaultProps}
      />,
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  describe('prop: onClick', () => {
    it('is triggered when clicked', () => {
      const onClick = jest.fn();
      const wrapper = shallowWithContext(
        <DeleteButton
          onClick={onClick}
          isEnabled
        />,
    );
      const button = wrapper.find('IconButton');
      button.simulate('touchTap');
      expect(onClick).toHaveBeenCalled();
    });
  });

  it('renders nothing if user cannot delete this snippet', () => {
    const wrapper = shallowWithContext(
      <EnhancedDeleteButton
        {...defaultProps}
      />,
    );
    expect(wrapper.find('Nothing').length).toEqual(1);
  });

  it('renders nothing if snippet has not been saved', () => {
    const snippetKey = '';
    const wrapper = shallowWithContext(
      <EnhancedDeleteButton
        {...defaultProps}
        snippetKey={snippetKey}
      />,
    );
    expect(wrapper.find('Nothing').length).toEqual(1);
  });
});
