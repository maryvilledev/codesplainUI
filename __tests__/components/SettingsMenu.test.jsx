import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import SettingsMenu from '../../src/components/menus/SettingsMenu';

const defaultProps = {
  deleteEnabled: false,
  onDeleteClick: jest.fn(),
  onKeymapChange: jest.fn(),
  onThemeChange: jest.fn(),
};

describe('<SettingsMenu />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = node => shallow(node, { context: { muiTheme } });

  describe('snapshot tests', () => {
    it('matches snapshot of when user cannot delete snippet', () => {
      const wrapper = shallowWithContext(
        <SettingsMenu {...defaultProps} />,
      );
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('matches snapshot of when user can delete snippet', () => {
      const wrapper = shallowWithContext(
        <SettingsMenu
          {...defaultProps}
          deleteEnabled
        />,
      );
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });

  describe('prop: onThemeChange', () => {
    it('is forwarded to ThemePicker', () => {
      const onThemeChange = () => {};
      const wrapper = shallowWithContext(
        <SettingsMenu
          {...defaultProps}
          onThemeChange={onThemeChange}
        />,
      );
      const themePicker = wrapper.find('ThemePicker');
      expect(themePicker.prop('onChange')).toEqual(onThemeChange);
    });
  });

  describe('prop: onKeymapChange', () => {
    it('is forwarded to KeymapPicker', () => {
      const onKeymapChange = () => {};
      const wrapper = shallowWithContext(
        <SettingsMenu
          {...defaultProps}
          onKeymapChange={onKeymapChange}
        />,
      );
      const keymapPicker = wrapper.find('KeymapPicker');
      expect(keymapPicker.prop('onChange')).toEqual(onKeymapChange);
    });
  });

  describe('prop: selectedKeymap', () => {
    it('is forwarded to KeymapPicker', () => {
      const selectedKeymap = 'monokai';
      const wrapper = shallowWithContext(
        <SettingsMenu
          {...defaultProps}
          selectedKeymap={selectedKeymap}
        />,
      );
      const keymapPicker = wrapper.find('KeymapPicker');
      expect(keymapPicker.prop('selectedKeymap')).toEqual(selectedKeymap);
    });
  });
});
