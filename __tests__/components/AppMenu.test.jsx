import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import AppMenu from '../../src/components/menus/AppMenu';

const defaultProps = {
  avatarURL: 'https://wallykazam.com/whozit',
  onSignOut: jest.fn(),
  onTitleClicked: jest.fn(),
  snippetTitles: {},
};

describe('<AppMenu />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = node => shallow(node, { context: { muiTheme } });

  describe('snapshot tests', () => {
    it('matches snapshot of when user is not logged in', () => {
      const wrapper = shallowWithContext(
        <AppMenu
          {...defaultProps}
        />,
      );
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('matches snapshot of when user is logged in', () => {
      const wrapper = shallowWithContext(
        <AppMenu {...defaultProps} />,
      );
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });

  describe('prop: onSignOut', () => {
    it('should be forwarded', () => {
      const onSignOut = jest.fn();
      const wrapper = shallowWithContext(
        <AppMenu
          {...defaultProps}
          onSignOut={onSignOut}
        />,
      );
      expect(wrapper.find('MenuItem').prop('onClick')).toEqual(onSignOut);
    });
  });
});
