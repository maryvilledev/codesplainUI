import moxios from 'moxios';

import * as actions from '../../src/actions/app';
import generateMockStore from '../../src/testUtils/mockStore';

describe('Actions: App', () => {
  it('creates correct SET_SNIPPET_KEY action object', () => {
    const key = 'szechuan sauce';
    expect(actions.setSnippetKey(key)).toMatchSnapshot();
  });
  it('creates correct SET_SNIPPET_CONTENTS action object', () => {
    const snippet = 'Show me what you got';
    expect(actions.setSnippetContents(snippet)).toMatchSnapshot();
  });
  it('creates correct SET_RULE_FILTERS action object', () => {
    const filters = {
      for_stmt: {
        prettyTokenName: 'For Loops',
        count: 1,
        selected: false,
      },
      atom: {
        prettyTokenName: 'Atoms',
        count: 21,
        selected: true,
      },
    };
    expect(actions.setRuleFilters(filters)).toMatchSnapshot();
  });
  it('creates correct RESET_RULE_FILTERS action object', () => {
    expect(actions.resetFilters()).toMatchSnapshot();
  });
  it('creates correct SELECT_ALL_FILTERS action object', () => {
    expect(actions.selectAllFilters()).toMatchSnapshot();
  });
  it('creates correct RESET_STATE action object', () => {
    expect(actions.resetState()).toMatchSnapshot();
  });
  it('creates correct RESET_STATE action object', () => {
    const AST = {
      type: 'file_input',
      begin: 0,
      end: 1,
      children: [
        'NEWLINE',
        'INDENT',
        'NEWLINE',
        'DEDENT',
      ],
    };
    expect(actions.setAST(AST)).toMatchSnapshot();
  });
  it('creates correct TOGGLE_EDITING_STATE action object', () => {
    expect(actions.toggleEditState()).toMatchSnapshot();
  });
  it('creates correct SAVE_ANNOTATION action object', () => {
    const annotationData = {
      annotation: 'You pass butter.',
      lineNumber: 1,
      lineText: 'What is my purpose?',
    };
    expect(actions.saveAnnotation(annotationData)).toMatchSnapshot();
  });
  it('creates correct RESTORE_STATE action object', () => {
    const savedState = {
      snippet: '\t',
      snippetTitle: '',
      annotations: {},
      AST: {
        type: 'file_input',
        begin: 0,
        end: 1,
        children: [
          'NEWLINE',
          'INDENT',
          'NEWLINE',
          'DEDENT',
        ],
      },
      filters: {},
      readOnly: false,
    };
    expect(actions.restoreState(savedState)).toMatchSnapshot();
  });
  it('creates correct SET_SNIPPET_TITLE action object', () => {
    const snippetTitle = 'Get Schwifty';
    const expected = {
      type: actions.SET_SNIPPET_TITLE,
      payload: snippetTitle,
    };
    expect(actions.setSnippetTitle(snippetTitle)).toEqual(expected);
  });
  it('creates correct SET_SNIPPET_LANGUAGE action object', () => {
    const snippetLanguage = 'Gromflomite';
    expect(actions.setSnippetLanguage(snippetLanguage)).toMatchSnapshot();
  });
  it('creates correct PARSE_SNIPPET action object', () => {
    const snippet = 'Grasssss tastes bad';
    expect(actions.parseSnippet(snippet)).toMatchSnapshot();
  });
  it('creates correct SAVE_SUCCEEDED action object', () => {
    const expected = {
      type: actions.SAVE_SUCCEEDED,
    };
    expect(actions.saveSucceeded()).toEqual(expected);
  });
  describe('async actions', () => {
    beforeEach(() => {
      moxios.install();
    });
    afterEach(() => {
      moxios.uninstall();
    });
    describe('saveNew()', () => {
      it('dispatches correct actions if save succeeded', () => {
        const key = 'gazorpazorp';
        const org = 'rick-sanchez';
        moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.respondWith({
            status: 200,
            response: { key, status: '200' },
          });
        });
        const store = generateMockStore({
          app: {},
          user: { token: '', orgs: [] },
        });
        return store.dispatch(actions.saveNew(org))
          .then((returnVal) => { // return of async actions
            expect(store.getActions()).toMatchSnapshot();
            expect(returnVal).toEqual(key);
          });
      });
      it('dispatches correct actions if save failed', () => {
        const org = 'rick-sanchez';
        moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.respondWith({
            status: 400,
          });
        });
        const store = generateMockStore({
          app: {},
          user: { token: '', orgs: [] },
        });
        return store.dispatch(actions.saveNew(org))
          .then(() => { // return of async actions
            expect(store.getActions()).toMatchSnapshot();
          });
      });
    });
    describe('deleteSnippet()', () => {
      it('dispatches the correct actions if the action succeeded', () => {
        const snippetKey = 'snippetKey';
        moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.respondWith({
            status: 200,
          });
        });
        const store = generateMockStore({
          user: {
            token: '',
            selectedOrg: '',
            orgs: [],
          },
        });
        return store.dispatch(actions.deleteSnippet(snippetKey))
          .then(() => {
            expect(store.getActions()).toMatchSnapshot();
          });
      });
      it('dispatches the correct actions if the action fails', () => {
        const snippetKey = 'snippetKey';
        moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.respondWith({
            status: 400,
          });
        });
        const store = generateMockStore({
          user: {
            token: '',
            selectedOrg: '',
            orgs: [],
          },
        });
        return store.dispatch(actions.deleteSnippet(snippetKey))
          .catch(() => {
            expect(store.getActions()).toMatchSnapshot();
          });
      });
    });
    describe('saveExisting()', () => {
      it('dispatches the correct actions if the action succeeded', () => {
        moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.respondWith({
            status: 200,
          });
        });
        const store = generateMockStore({
          app: {},
          user: { token: '', username: '', orgs: [] },
        });
        return store.dispatch(actions.saveExisting())
          .then(() => { // return of async actions
            expect(store.getActions()).toMatchSnapshot();
          });
      });
      it('dispatches the correct actions if the action failed', () => {
        moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.respondWith({
            status: 400,
          });
        });
        const store = generateMockStore({
          app: {},
          user: { token: '', username: '', orgs: [] },
        });
        return store.dispatch(actions.saveExisting())
          .then(() => { // return of async actions
            expect(store.getActions()).toMatchSnapshot();
          });
      });
    });
    describe('loadSnippet()', () => {
      it('dispatches the correct actions if the action succeeded', () => {
        moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.respondWith({
            status: 200,
            response: JSON.stringify({
              snippet: 'snippet',
            }),
          });
        });
        const store = generateMockStore({
          app: {},
          user: { token: '' },
        });
        const snippetOwner = 'snippetOwner';
        const snippetKey = 'key';
        return store.dispatch(actions.loadSnippet(snippetOwner, snippetKey))
          .then(() => { // return of async actions
            expect(store.getActions()).toMatchSnapshot();
          });
      });
    });
  });
});
