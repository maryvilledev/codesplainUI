import React from 'react';
import { Provider } from 'react-redux';
import { shallow, mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import toJson, { shallowToJson } from 'enzyme-to-json';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import moxios from 'moxios'
import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

import { Auth, ConnectedAuth, errors } from '../../src/components/Auth';
import Alert from '../../src/components/Alert';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('<Auth />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = (node) => shallow(node, { context: { muiTheme } });
  const mountWithContext = (node) => mount(node, {
    context: { muiTheme },
    childContextTypes: { muiTheme: React.PropTypes.object }
   });

  it('matches snapshot', () => {
    const wrapper = shallowWithContext(
      <Auth />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  describe('login responses', () => {
    beforeEach(() => {
      moxios.install();
    })
    afterEach(() => {
      moxios.uninstall();
    })

    it('should respond to a 400', done => {
      const mockRouter = {
        location: {
          query: 'badcode',
        },
      };
      const store = mockStore({});
      const wrapper = mountWithContext(
        <Provider store={store}>
          <ConnectedAuth router={mockRouter} />
        </Provider>
      );
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 400,
          response: {status: '400'}
        }).then(() => {
          const alert = wrapper.find(Alert).first();
          expect(alert.exists()).toBeTruthy();
          expect(alert.props().text).toEqual(errors.badCode);
          done();
        });
      });
    })
    it('should respond to a 403', done => {
      const mockRouter = {
        location: {
          query: 'badcode',
        },
      };
      const store = mockStore({});
      const wrapper = mountWithContext(
        <Provider store={store}>
          <ConnectedAuth router={mockRouter} />
        </Provider>
      );
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 403,
          response: {status: '403'}
        }).then(() => {
          const alert = wrapper.find(Alert).first();
          expect(alert.exists()).toBeTruthy();
          expect(alert.props().text).toEqual(errors.badOrg);
          done();
        });
      });
    })
  })
});
