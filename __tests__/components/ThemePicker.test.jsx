import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import ThemePicker from '../../src/components/menus/ThemePicker';

const defaultProps = {
  onChange: jest.fn(),
};

describe('<ThemePicker />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = node => shallow(node, { context: { muiTheme } });

  describe('snapshot tests', () => {
    it('matches default snapshot', () => {
      const wrapper = shallowWithContext(<ThemePicker {...defaultProps} />);
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });

  describe('prop: codeMirrorTheme', () => {
    it('is forwarded to underlying IconMenu', () => {
      const codeMirrorTheme = 'monokai';
      const wrapper = shallowWithContext(
        <ThemePicker
          {...defaultProps}
          codeMirrorTheme={codeMirrorTheme}
        />,
      );
      expect(wrapper.find('IconMenu').prop('value')).toEqual(codeMirrorTheme);
    });
  });

  describe('prop: onChange', () => {
    it('is forwarded to underlying IconMenu', () => {
      const onChange = () => {};
      const wrapper = shallowWithContext(
        <ThemePicker
          {...defaultProps}
          onChange={onChange}
        />,
      );
      expect(wrapper.find('IconMenu').prop('onChange')).toEqual(onChange);
    });
  });
});
