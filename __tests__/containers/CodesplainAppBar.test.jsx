import React from 'react';
import cookie from 'react-cookie';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { createStore } from 'redux';
import app from '../../src/reducers/app.js'

import { CodesplainAppBar } from '../../src/containers/CodesplainAppBar';

describe('<CodesplainAppBar />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = (node) => shallow(node, { context: { muiTheme } });

  describe('snapshot tests', () => {
    afterEach(() => {
      cookie.remove('token');
    });
    it('user is not logged in', () => {
      const wrapper = shallowWithContext(
        <CodesplainAppBar
          store={createStore(app)}
        />
      );
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('user is logged in', () => {
      cookie.save('token', 'foobar')
      const wrapper = shallowWithContext(
        <CodesplainAppBar
          store={createStore(app)}
        />
      );
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });
});
