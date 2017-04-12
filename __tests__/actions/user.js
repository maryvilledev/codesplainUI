import moxios from 'moxios';
import cookie from 'react-cookie';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as actions from '../../src/actions/user';

describe('Actions: User', () => {
  describe('async actions', () => {
    const middlewares = [ thunk ];
    const mockStore   = configureMockStore(middlewares);

    beforeEach(() => {
      moxios.install();
    });
    afterEach(() => {
      cookie.remove('token');
      cookie.remove('username');
      moxios.uninstall();
    });

    describe('UPDATE_USER_SNIPPETS', () => {
      it('dispatches no additional actions if not logged in', () => {
        const store = mockStore({});
        return store.dispatch(actions.updateUserSnippets())
          .then(() => { // return of async actions
            expect(store.getActions()).toEqual([]);
          });
      });
      it('dispatches SET_USER_SNIPPETS, UPDATE_USER_SNIPPETS_STARTED, and ' +
         'UPDATE_USER_SNIPPETS_SUCCEEDED if successful', () => {
        moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.respondWith({
            status: 200,
            response: {
              'test_snippet_1': {
                snippetName: 'Test Snippet 1',
                language:    'Python 3',
                lastEdited:  '2017-04-05T12:52:20.099Z',
                'private':   true,
              },
              'test_snippet_1': {
                snippetName: 'Test Snippet 2',
                language:    'Python 3',
                lastEdited:  '2017-04-05T12:52:20.099Z',
                'private':   true,
              }
            },
          });
          cookie.save('token', '1234', { path: '/' });
          cookie.save('username', 'foo', { path: '/' });
          const expectedActions = [
            { type: actions.UPDATE_USER_SNIPPETS },
            { type: actions.UPDATE_USER_SNIPPETS_STARTED },
            { type: actions.UPDATE_USER_SNIPPETS_SUCCEEDED },
          ];
          const store = mockStore({});
          return store.dispatch(actions.updateUserSnippets())
            .then(() => { // return of async actions
              expect(store.getActions()).toEqual(expectedActions);
            });
        });
        it('dispatches UPDATE_USER_SNIPPETS_FAILED if unsuccessful', () => {
          moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
              status: 400,
            });
          });
          cookie.save('token', '1234', { path: '/' });
          cookie.save('username', 'foo', { path: '/' });
          const expectedActions = [
            { type: actions.UPDATE_USER_SNIPPETS_FAILED },
          ];
          const store = mockStore({});
          return store.dispatch(actions.updateUserSnippets())
            .then(() => {
              expect(store.getActions()).toEqual(expectedActions);
            });
        });
      });
    });
    describe('SET_USER_SNIPPETS', () => {
      it('creates an action to save meta data about user`s snippets', () => {
        const snippetMeta = [
          {
            snippetName: 'Test Snippet',
            language:    'Python 3',
            lastEdited:  '2017-04-05T12:52:20.099Z',
            'private':   true,
          }
        ];
        const expected = {
          type:    actions.SET_USER_SNIPPETS,
          payload: snippetMeta,
        };
        expect(actions.setUserSnippets(snippetMeta)).toEqual(expected);
      });
    });
  });
});
