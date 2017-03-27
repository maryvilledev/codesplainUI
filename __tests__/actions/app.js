import moxios from 'moxios';
import cookie from 'react-cookie';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as actions from '../../src/actions/app';

describe('Actions: App', () => {
  describe('SET_SNIPPET_CONTENTS', () => {
    it('creates an action to set the snippet contents', () => {
      const snippet = 'Show me what you got';
      const expected = {
        type: actions.SET_SNIPPET_CONTENTS,
        payload: snippet,
      };
      expect(actions.setSnippetContents(snippet)).toEqual(expected);
    });
  });
  describe('SET_RULE_FILTERS', () => {
    it('creates an action to set the rule filters', () => {
      const filters = {
        'for_stmt': {
          prettyTokenName: 'For Loops',
          count: 1,
          selected: false
        },
        'atom': {
          prettyTokenName: 'Atoms',
          count: 21,
          selected: true
        },
      };
      const expected = {
        type: actions.SET_RULE_FILTERS,
        payload: filters
      };
      expect(actions.setRuleFilters(filters)).toEqual(expected);
    });
  });
  describe('SET_AST', () => {
    it('creates an action to set the abstract syntax tree', () => {
      const AST = {
        "type": "file_input",
        "begin": 0,
        "end": 1,
        "children": [
          "NEWLINE",
          "INDENT",
          "NEWLINE",
          "DEDENT"
        ],
      };
      const expected = {
        type: actions.SET_AST,
        payload: AST
      };
      expect(actions.setAST(AST)).toEqual(expected);
    });
  });
  describe('TOGGLE_EDITING_STATE', () => {
    it('creates an action that toggles the editing state', () => {
      const expected = {
        type: actions.TOGGLE_EDITING_STATE,
      };
      expect(actions.toggleEditState()).toEqual(expected);
    });
  });
  describe('SAVE_ANNOTATION', () => {
    it('creates an action that adds an annotation', () => {
      const annotationData = {
        annotation: 'You pass butter.',
        lineNumber: 1,
        lineText: 'What is my purpose?'
      };
      const expected = {
        type: actions.SAVE_ANNOTATION,
        payload: annotationData,
      };
      expect(actions.saveAnnotation(annotationData)).toEqual(expected);
    });
  });
  describe('RESTORE_STATE', () => {
    it('creates an action that restores state', () => {
      const savedState = {
        "snippet": "\t",
        "snippetTitle": "",
        "annotations": {},
        "AST": {
          "type": "file_input",
          "begin": 0,
          "end": 1,
          "children": [
            "NEWLINE",
            "INDENT",
            "NEWLINE",
            "DEDENT"
          ]
        },
        "filters": {},
        "readOnly": false
      };
      const expected = {
        type: actions.RESTORE_STATE,
        payload: savedState
      };
      expect(actions.restoreState(savedState)).toEqual(expected);
    });
  });
  describe('SET_SNIPPET_TITLE', () => {
    it('creates an action to set the snippet title', () => {
      const snippetTitle = 'Get Schwifty';
      const expected = {
        type: actions.SET_SNIPPET_TITLE,
        payload: snippetTitle
      };
      expect(actions.setSnippetTitle(snippetTitle)).toEqual(expected);
    });
  });
  describe('SET_SNIPPET_LANGUAGE', () => {
    it('creates an action to set the snippet language', () => {
      const snippetLanguage = 'Gromflomite';
      const expected = {
        type: actions.SET_SNIPPET_LANGUAGE,
        payload: snippetLanguage
      };
      expect(actions.setSnippetLanguage(snippetLanguage)).toEqual(expected);
    });
  });
  describe('PARSE_SNIPPET', () => {
    it('creates an action to parse the snippet with a web worker', () => {
      const snippet = 'Grasssss tastes bad';
      const expected = {
        type: actions.PARSE_SNIPPET,
        meta: {
          WebWorker: true,
        },
        payload: {
          snippet,
        },
      };
      expect(actions.parseSnippet(snippet)).toEqual(expected);
    });
  });
  describe('CLEAR_UNSAVED_CHANGES', () => {
    it('creates an action to clear the flag that denotes unsaved changes', () => {
      const expected = {
        type: actions.CLEAR_UNSAVED_CHANGES,
      };
      expect(actions.clearUnsavedChanges()).toEqual(expected)
    });
  });
  describe('SAVE_STATE_STARTED', () => {
    it('creates an action to notify state save has started', () => {
      const expected = {
        type: actions.SAVE_STATE_STARTED,
      };
      expect(actions.saveStateStarted()).toEqual(expected);
    });
  });
  describe('SAVE_STATE_SUCCEEDED', () => {
    it('creates an action to notify state save has succeeded', () => {
      const expected = {
        type: actions.SAVE_STATE_SUCCEEDED,
      };
      expect(actions.saveStateSucceeded()).toEqual(expected);
    });
  });
  describe('SAVE_STATE_FAILED', () => {
    it('creates an action to notify state save has failed', () => {
      const expected = {
        type: actions.SAVE_STATE_FAILED,
      };
      expect(actions.saveStateFailed()).toEqual(expected);
    });
  });
  describe('async actions', () => {
    const middlewares = [ thunk ];
    const mockStore = configureMockStore(middlewares);
    const mockId = 0;

    beforeEach(() => {
      moxios.install();
    });
    afterEach(() => {
      cookie.remove('username');
      moxios.uninstall();
    });
    describe('SAVE_STATE', () => {
      it('dispatches no additional actions if an id is not supplied', () => {
        const store = mockStore({});
        return store.dispatch(actions.saveState())
          .then(() => { // return of async actions
          expect(store.getActions()).toEqual([])
        });
      });
      it('dispatches no additional actions if not logged in', () => {
        const store = mockStore({});
        return store.dispatch(actions.saveState(mockId))
          .then(() => { // return of async actions
          expect(store.getActions()).toEqual([])
        });
      });
      it('creates SAVE_STATE_SUCCEEDED if saved', () => {
        moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.respondWith({
            status: 200,
            response: { id: mockId, status: '200' },
          });
        });
        cookie.save('username', 'foo');
        const expectedActions = [
          { type: actions.SAVE_STATE_STARTED, },
          { type: actions.SAVE_STATE_SUCCEEDED, },
        ];
        const store = mockStore({});
        return store.dispatch(actions.saveState(mockId))
          .then(() => { // return of async actions
          expect(store.getActions()).toEqual(expectedActions)
        });
      });
      it('creates SAVE_STATE_FAILED if save failed', () => {
        moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.respondWith({
            status: 400,
          });
        });
        cookie.save('username', 'foo');
        const expectedActions = [
          { type: actions.SAVE_STATE_STARTED, },
          { type: actions.SAVE_STATE_FAILED, },
        ];
        const store = mockStore({});
        return store.dispatch(actions.saveState(mockId))
          .then(() => { // return of async actions
          expect(store.getActions()).toEqual(expectedActions)
        });
      });
    });
  });
});
