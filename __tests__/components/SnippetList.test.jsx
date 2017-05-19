import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import SnippetList from '../../src/components/menus/SnippetList';

const defaultProps = {
  onClick: jest.fn(),
  primaryText: '',
  snippetsList: {},
  snippetOwner: 'username',
};

describe('<SnippetList />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = node => shallow(node, { context: { muiTheme } });

  describe('snapshot tests', () => {
    it('matches when no snippets are passed', () => {
      const wrapper = shallowWithContext(
        <SnippetList
          {...defaultProps}
        />,
      );
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
    it('matches when snippets are passed', () => {
      const snippetsList = {
        foo: { snippetTitle: 'bar' },
        baz: { snippetTitle: 'qux' },
      };
      const wrapper = shallowWithContext(
        <SnippetList
          {...defaultProps}
          snippetOwner="username"
          snippetsList={snippetsList}
        />,
      );
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });
});
