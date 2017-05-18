import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import GistsMenu from '../../src/components/menus/GistsMenu';

const defaultProps = {
  onClick: jest.fn(),
};

describe('<GistsMenu />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = node => shallow(node, { context: { muiTheme } });

  describe('snapshot tests', () => {
    it('matches when no snippets are passed', () => {
      const wrapper = shallowWithContext(
        <GistsMenu
          {...defaultProps}
        />,
      );
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
    it('matches when gists are passed', () => {
      const gists = [{ name: 'phonixpersonanatomy.py', url: 'www.rickandmorty100years.com' }];
      const wrapper = shallowWithContext(
        <GistsMenu
          {...defaultProps}
          gists={gists}
        />,
      );
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });
});
