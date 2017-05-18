import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as actions from '../../src/actions/user';

describe('Actions: User', () => {
  describe('action creators', () => {
    it('creates correct ADD_ORG object', () => {
      const org = 'galactic-federation';
      expect(actions.addOrg(org)).toMatchSnapshot();
    });

    it('creates correct ADD_ORGANIZATIONS object', () => {
      const organizations = ['Galactic Federation', 'Council Of Ricks'];
      expect(actions.addOrganizations(organizations)).toMatchSnapshot();
    });

    it('creates correct CLEAR_USER_CREDENTIALS object', () => {
      expect(actions.clearUserCredentials()).toMatchSnapshot();
    });

    it('creates correct SET_AVATAR_URL object', () => {
      const url = 'https://foobar.com/quxbaz';
      expect(actions.setAvatarUrl(url)).toMatchSnapshot();
    });

    it('creates correct SAVE_USERNAME object', () => {
      const token = 'token';
      expect(actions.saveUsername(token)).toMatchSnapshot();
    });

    it('creates correct SAVE_ACCESS_TOKEN object', () => {
      const token = 'token';
      expect(actions.saveAccessToken(token)).toMatchSnapshot();
    });

    it('creates correct SAVE_USERNAME object', () => {
      const token = 'token';
      expect(actions.saveUsername(token)).toMatchSnapshot();
    });

    it('creates correct SET_SNIPPET_LISTS object', () => {
      const snippetLists = ['list', 'of', 'snippets'];
      expect(actions.setSnippetLists(snippetLists)).toMatchSnapshot();
    });

    it('creates correct SET_USER_SNIPPETS object', () => {
      const snippetLists = ['list', 'of', 'snippets'];
      expect(actions.setUserSnippets(snippetLists)).toMatchSnapshot();
    });

    it('creates correct SWITCH_ORG object', () => {
      const org = 'galactic-federation';
      expect(actions.switchOrg(org)).toMatchSnapshot();
    });
  });

  describe('async actions', () => {
    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);

    beforeEach(() => {
      moxios.install();
    });

    afterEach(() => {
      moxios.uninstall();
    });

    describe('UPDATE_USER_SNIPPETS', () => {
      it('dispatches SET_USER_SNIPPETS, UPDATE_USER_SNIPPETS_STARTED, and ' +
         'UPDATE_USER_SNIPPETS_SUCCEEDED if successful', () => {
        moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.respondWith({
            status: 200,
            response: {
              test_snippet_1: {
                snippetName: 'Test Snippet 1',
                language: 'Python 3',
                lastEdited: '2017-04-05T12:52:20.099Z',
                private: true,
              },
              test_snippet_2: {
                snippetName: 'Test Snippet 2',
                language: 'Python 3',
                lastEdited: '2017-04-05T12:52:20.099Z',
                private: true,
              },
            },
          });
          const expectedActions = [
            { type: actions.UPDATE_USER_SNIPPETS },
            { type: actions.UPDATE_USER_SNIPPETS_STARTED },
            { type: actions.UPDATE_USER_SNIPPETS_SUCCEEDED },
          ];
          const store = mockStore({
            user: {
              username: 'FooBar',
              token: '1234',
            },
          });
          return store.dispatch(actions.updateUserSnippets())
            .then(() => { // return of async actions
              expect(store.getActions()).toEqual(expectedActions);
            });
        });
      });

      it('dispatches UPDATE_USER_SNIPPETS_FAILED if unsuccessful', () => {
        moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.respondWith({
            status: 400,
          });
        });
        const expectedActions = [
          { type: actions.UPDATE_USER_SNIPPETS_STARTED },
          { type: actions.UPDATE_USER_SNIPPETS_FAILED },
        ];
        const store = mockStore({
          user: {
            username: 'FooBar',
            token: '1234',
          },
        });
        return store.dispatch(actions.updateUserSnippets())
          .catch(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
      });
    });

    describe('SET_USER_SNIPPETS', () => {
      it('creates an action to save meta data about user`s snippets', () => {
        const snippetMeta = [
          {
            snippetName: 'Test Snippet',
            language: 'Python 3',
            lastEdited: '2017-04-05T12:52:20.099Z',
            private: true,
          },
        ];
        const expected = {
          type: actions.SET_USER_SNIPPETS,
          payload: snippetMeta,
        };
        expect(actions.setUserSnippets(snippetMeta)).toEqual(expected);
      });
    });
  });
});
