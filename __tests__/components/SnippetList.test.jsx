import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import SnippetList from '../../src/components/menus/SnippetList';

const defaultProps = {
  titles: {},
  onClick: jest.fn(),
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
      const wrapper = shallowWithContext(
        <SnippetList
          {...defaultProps}
          titles={{
            foo: { snippetTitle: 'bar' },
            baz: { snippetTitle: 'qux' },
          }}
        />,
      );
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });
});
