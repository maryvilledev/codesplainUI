import React from 'react';
import { Provider } from 'react-redux';
import cookie from 'react-cookie';
import { shallow, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';

import { saveAccessToken } from '../../src/actions/user';
import generateMockStore from '../../src/testUtils/mockStore';
import generateMockRouter from '../../src/testUtils/mockRouter';
import {
  ConnectedAppBar,
  CodesplainAppBar,
} from '../../src/containers/CodesplainAppBar';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const mockAuthor = 'phoenixperson';
const defaultStore = {
  app: { hasUnsavedChanges: true },
  user: {
    avatarUrl: '',
    orgSnippets: {},
    token: '',
    username: '',
    userSnippets: {},
  },
};

describe('<CodesplainAppBar />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = node => shallow(node, { context: { muiTheme } });
  const mountWithContext = node => mount(node, {
    context: { muiTheme },
    childContextTypes: { muiTheme: React.PropTypes.object },
  });

  describe('snapshot tests', () => {
    afterEach(() => {
      cookie.remove('token');
    });

    it('user is not logged in', () => {
      const wrapper = shallowWithContext(
        <CodesplainAppBar
          username="FooBar"
          hasUnsavedChanges={false}
          author={mockAuthor}
        />,
      );
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('user is logged in', () => {
      cookie.save('token', 'foobar');
      const wrapper = shallowWithContext(
        <CodesplainAppBar
          username="FooBar"
          hasUnsavedChanges={false}
        />,
      );
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });

  describe('fetchUserAccountInfo', () => {
    it('saves the access token if it has not been already', () => {
      const accessToken = 'token';
      cookie.save('token', accessToken, { path: '/' });
      const store = generateMockStore({
        ...defaultStore,
        user: {
          ...defaultStore.user,
          // Set the username so the user info requests aren't triggered
          username: 'Rick Sanchez',
        },
      });
      const router = generateMockRouter({ location: { pathname: '/foobar' } });
      mountWithContext(
        <Provider store={store}>
          <ConnectedAppBar router={router} />
        </Provider>,
      );
      expect(store.getActions()[0]).toEqual(saveAccessToken(accessToken));
      cookie.remove('token', { path: '/' });
    });

    it('does not save the access token if it already has been', () => {
      const store = generateMockStore({
        ...defaultStore,
        user: {
          ...defaultStore.user,
          token: 'token',
          // Set the username so the user info requests aren't triggered
          username: 'Rick Sanchez',
        },
      });
      const router = generateMockRouter({ location: { pathname: '/foobar' } });
      mountWithContext(
        <Provider store={store}>
          <ConnectedAppBar router={router} />
        </Provider>,
      );
      expect(store.getActions().length).toEqual(0);
    });
  });

  describe('resetApplication', () => {
    it('dispatches the correct actions to reset state', () => {
      const store = generateMockStore(defaultStore);
      const wrapper = mountWithContext(
        <Provider store={store}>
          <ConnectedAppBar />
        </Provider>,
      );
      const codesplainAppBar = wrapper.find(CodesplainAppBar).getNode();
      codesplainAppBar.resetApplication();
      expect(store.getActions()).toMatchSnapshot();
    });
  });

  describe('handleSnippetSelected', () => {
    it('routes to the next snippet', () => {
      const store = generateMockStore(defaultStore);
      const router = generateMockRouter();
      const wrapper = mountWithContext(
        <Provider store={store}>
          <ConnectedAppBar router={router} />
        </Provider>,
      );
      const codesplainAppBar = wrapper.find(CodesplainAppBar).getNode();
      const snippetOwner = 'username';
      const snippetKey = 'snippet';
      codesplainAppBar.handleSnippetSelected(snippetOwner, snippetKey);
      expect(router.push).toBeCalledWith(`/${snippetOwner}/${snippetKey}`);
    });
  });

  describe('redirectToHomePage', () => {
    it('does not redirect to the home URL if already there', () => {
      const store = generateMockStore(defaultStore);
      const router = generateMockRouter();
      const wrapper = mountWithContext(
        <Provider store={store}>
          <ConnectedAppBar router={router} />
        </Provider>,
      );
      const codesplainAppBar = wrapper.find(CodesplainAppBar).getNode();
      codesplainAppBar.redirectToHomePage();
      expect(router.push).not.toBeCalled();
    });

    it('redirects to home URL if not already there', () => {
      const store = generateMockStore(defaultStore);
      const router = generateMockRouter({ location: { pathname: '/foobar' } });
      const wrapper = mountWithContext(
        <Provider store={store}>
          <ConnectedAppBar router={router} />
        </Provider>,
      );
      const codesplainAppBar = wrapper.find(CodesplainAppBar).getNode();
      codesplainAppBar.redirectToHomePage();
      expect(router.push).toBeCalledWith('/');
    });
  });
});
