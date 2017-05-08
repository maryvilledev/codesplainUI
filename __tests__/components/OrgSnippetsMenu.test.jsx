import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import OrgSnippetsMenu from '../../src/components/menus/OrgSnippetsMenu';

const defaultProps = {
  onClick: jest.fn(),
  orgSnippets: {},
};

describe('<OrgSnippetsMenu />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = node => shallow(node, { context: { muiTheme } });

  describe('snapshot tests', () => {
    it('matches when no snippets are passed', () => {
      const wrapper = shallowWithContext(
        <OrgSnippetsMenu
          {...defaultProps}
        />,
      );
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
    it('matches when snippets are passed', () => {
      const orgSnippets = {
        org1: {
          foo: { snippetTitle: 'bar' },
          baz: { snippetTitle: 'qux' },
        },
        org2: {},
      };
      const wrapper = shallowWithContext(
        <OrgSnippetsMenu
          {...defaultProps}
          orgSnippets={orgSnippets}
        />,
      );
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });
});
