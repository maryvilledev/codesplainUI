import React from 'react';
import cookie from 'react-cookie';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import { CodesplainAppBar, mapDispatchToProps } from '../../src/containers/CodesplainAppBar';

const defaultProps = {
  fetchUserSnippets: jest.fn(),
  hasUnsavedChanges: false,
  hideAnnotationPanel: jest.fn(),
  resetAppState: jest.fn(),
  userSnippets: {},
};

const muiTheme = getMuiTheme();
const shallowWithContext = node => shallow(node, { context: { muiTheme } });

const setup = (props = {}) => (
  shallowWithContext(<CodesplainAppBar {...defaultProps} {...props} />)
);

describe('<CodesplainAppBar />', () => {
  describe('snapshot tests', () => {
    afterEach(() => {
      cookie.remove('token');
    });

    it('user is not logged in', () => {
      const wrapper = setup();
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('user is logged in', () => {
      cookie.save('token', 'foobar');
      const wrapper = setup();
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });

  describe('mapDispatchToProps', () => {
    it('matches snapshot', () => {
      expect(mapDispatchToProps).toMatchSnapshot();
    });
  });
});
