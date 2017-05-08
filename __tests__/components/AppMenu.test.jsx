import React from 'react';
import cookie from 'react-cookie';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import AppMenu from '../../src/components/menus/AppMenu';

const defaultProps = {
  onSignOut: jest.fn(),
  onSnippetSelected: jest.fn(),
  userSnippets: {},
};

describe('<AppMenu />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = node => shallow(node, { context: { muiTheme } });

  afterEach(() => {
    cookie.remove('userAvatarURL');
  });

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
      cookie.save('userAvatarURL', 'https://github.com/octocat.png');
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
