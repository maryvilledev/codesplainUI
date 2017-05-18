import moxios from 'moxios';

import * as actions from '../../src/actions/app';
import generateMockStore from '../../src/testUtils/mockStore';

describe('Actions: App', () => {
  describe('SET_SNIPPET_KEY', () => {
    it('creates correct action object', () => {
      const key = 'szechuan sauce';
      expect(actions.setSnippetKey(key)).toMatchSnapshot();
    });
  });
  describe('SET_SNIPPET_CONTENTS', () => {
    it('creates an action to set the snippet contents', () => {
      const snippet = 'Show me what you got';
      expect(actions.setSnippetContents(snippet)).toMatchSnapshot();
    });
  });
  describe('SET_RULE_FILTERS', () => {
    it('creates an action to set the rule filters', () => {
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
  });
  describe('RESET_RULE_FILTERS', () => {
    it('matches snapshot', () => {
      expect(actions.resetFilters()).toMatchSnapshot();
    });
  });
  describe('SELECT_ALL_FILTERS', () => {
    it('matches snapshot', () => {
      expect(actions.selectAllFilters()).toMatchSnapshot();
    });
  });
  describe('RESET_STATE', () => {
    it('matches snapshot', () => {
      expect(actions.resetState()).toMatchSnapshot();
    });
  });
  describe('SET_AST', () => {
    it('creates an action to set the abstract syntax tree', () => {
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
  });
  describe('TOGGLE_EDITING_STATE', () => {
    it('creates an action that toggles the editing state', () => {
      expect(actions.toggleEditState()).toMatchSnapshot();
    });
  });
  describe('SAVE_ANNOTATION', () => {
    it('creates an action that adds an annotation', () => {
      const annotationData = {
        annotation: 'You pass butter.',
        lineNumber: 1,
        lineText: 'What is my purpose?',
      };
      expect(actions.saveAnnotation(annotationData)).toMatchSnapshot();
    });
  });
  describe('RESTORE_STATE', () => {
    it('creates an action that restores state', () => {
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
  });
  describe('SET_SNIPPET_TITLE', () => {
    it('creates an action to set the snippet title', () => {
      const snippetTitle = 'Get Schwifty';
      const expected = {
        type: actions.SET_SNIPPET_TITLE,
        payload: snippetTitle,
      };
      expect(actions.setSnippetTitle(snippetTitle)).toEqual(expected);
    });
  });
  describe('SET_SNIPPET_LANGUAGE', () => {
    it('creates an action to set the snippet language', () => {
      const snippetLanguage = 'Gromflomite';
      expect(actions.setSnippetLanguage(snippetLanguage)).toMatchSnapshot();
    });
  });
  describe('PARSE_SNIPPET', () => {
    it('creates an action to parse the snippet with a web worker', () => {
      const snippet = 'Grasssss tastes bad';
      expect(actions.parseSnippet(snippet)).toMatchSnapshot();
    });
  });
  describe('SAVE_SUCCEEDED', () => {
    it('creates the correct action object', () => {
      const expected = {
        type: actions.SAVE_SUCCEEDED,
      };
      expect(actions.saveSucceeded()).toEqual(expected);
    });
  });
  describe('async actions', () => {
    beforeEach(() => {
      moxios.install();
    });
    afterEach(() => {
      moxios.uninstall();
    });
    describe('saveNew()', () => {
      it('dispatches SAVE_SUCCEEDED if saved', () => {
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
          user: { token: '' },
        });
        return store.dispatch(actions.saveNew(org))
          .then((returnVal) => { // return of async actions
            expect(store.getActions()).toMatchSnapshot();
            expect(returnVal).toEqual(key);
          });
      });
      it('dispatches SAVE_FAILED if save failed', () => {
        const org = 'rick-sanchez';
        moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.respondWith({
            status: 400,
          });
        });
        const store = generateMockStore({
          app: {},
          user: { token: '' },
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
          },
        });
        return store.dispatch(actions.deleteSnippet(snippetKey))
          .catch(() => {
            expect(store.getActions()).toMatchSnapshot();
          });
      });
    });
    describe('saveExisting()', () => {
      it('dispatches SAVE_SUCCEEDED if saved', () => {
        moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.respondWith({
            status: 200,
            response: { status: '200' },
          });
        });
        const store = generateMockStore({
          app: {},
          user: { token: '', username: '' },
        });
        return store.dispatch(actions.saveExisting())
          .then(() => { // return of async actions
            expect(store.getActions()).toMatchSnapshot();
          });
      });
      it('dispatches SAVE_FAILED if save failed', () => {
        moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.respondWith({
            status: 400,
          });
        });
        const store = generateMockStore({
          app: {},
          user: { token: '', username: '' },
        });
        return store.dispatch(actions.saveExisting())
          .then(() => { // return of async actions
            expect(store.getActions()).toMatchSnapshot();
          });
      });
    });
  });
});
