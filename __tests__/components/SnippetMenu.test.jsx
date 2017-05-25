import React from 'react';
import { shallow } from 'enzyme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { shallowToJson } from 'enzyme-to-json';
import SnippetMenu from '../../src/components/menus/SnippetMenu';

const defaultProps = {
  username: 'foo',
  userSnippets: {},
  orgSnippets: {},
  onSnippetSelected: jest.fn(),
  onHoverBackground: '',
  onOpenSearchMenu: jest.fn(),
  borderBottomColor: '',
};

describe('<SnippetMenu />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = node => shallow(node, { context: { muiTheme } });

  describe('snapshot tests', () => {
    it('matches snapshot of when user is not logged in', () => {
      const wrapper = shallowWithContext(
        <SnippetMenu {...defaultProps} />,
      );
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('matches snapshot of when user is logged in', () => {
      const wrapper = shallowWithContext(
        <SnippetMenu {...defaultProps} />,
      );
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });
});
