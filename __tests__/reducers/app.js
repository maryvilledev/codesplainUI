import * as actions from '../../src/actions/app';
import reducer, { initialState } from '../../src/reducers/app';

describe('Reducer: App', () => {
  it('should have initial state', () => {
    const initial = {
      annotations: {},
      AST: {},
      filters: {},
      hasUnsavedChanges: false,
      readOnly: false,
      snippet: '',
      snippetTitle: '',
    };
    expect(reducer(undefined, {})).toEqual(initial);
  });
  it('should handle SET_SNIPPET_CONTENTS', () => {
    const snippet = 'Show me what you got';
    const action = {
      type: actions.SET_SNIPPET_CONTENTS,
      payload: snippet,
    };
    const expected = {
      ...initialState,
      hasUnsavedChanges: true,
      snippet: action.payload,
    }
    expect(reducer(undefined, action)).toEqual(expected);
  });
  it('should handle TOGGLE_EDITING_STATE', () => {
    const action = {
      type: actions.TOGGLE_EDITING_STATE,
    };
    const expected = {
      ...initialState,
      hasUnsavedChanges: true,
      readOnly: true,
    };
    expect(reducer(undefined, action)).toEqual(expected);
  });
  it('should handle SET_RULE_FILTERS', () => {
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
    const action = {
      type: actions.SET_RULE_FILTERS,
      payload: filters,
    };
    const expected = {
      ...initialState,
      filters: action.payload,
      hasUnsavedChanges: true,
    };
    expect(reducer(undefined, action)).toEqual(expected);
  });
  it('should handle SET_AST', () => {
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
    const action = {
      type: actions.SET_AST,
      payload: AST,
    };
    const expected = {
      ...initialState,
      AST: action.payload,
    };
    expect(reducer(undefined, action)).toEqual(expected)
  });
  it('should handle SAVE_ANNOTATION', () => {
    const annotationData = {
      annotation: 'You pass butter.',
      lineNumber: 1,
      lineText: 'What is my purpose?'
    };
    const action = {
      type: actions.SAVE_ANNOTATION,
      payload: annotationData,
    };
    const expected = {
      ...initialState,
      annotations: {
        [annotationData.lineNumber]: annotationData,
      },
      hasUnsavedChanges: true,
    };
    expect(reducer(undefined, action)).toEqual(expected);
  });
  it('should handle RESTORE_STATE', () => {
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
    const action = {
      type: actions.RESTORE_STATE,
      payload: savedState
    };
    expect(reducer(undefined, action)).toEqual(savedState);
  });
  it('should handle SET_SNIPPET_TITLE', () => {
    const snippetTitle = 'Get Schwifty'
    const action = {
      type: actions.SET_SNIPPET_TITLE,
      payload: snippetTitle
    };
    const expected = {
      ...initialState,
      hasUnsavedChanges: true,
      snippetTitle,
    }
    expect(reducer(undefined, action)).toEqual(expected);
  });
  it('should handle SET_SNIPPET_LANGUAGE', () => {
    const snippetLanguage = 'Gromflomite';
    const action = {
      type: actions.SET_SNIPPET_LANGUAGE,
      payload: snippetLanguage,
    };
    const expected = {
      ...initialState,
      hasUnsavedChanges: true,
      snippetLanguage: action.payload,
    };
    expect(reducer(undefined, action)).toEqual(expected);
  });
  it('should handle CLEAR_UNSAVED_CHANGES', () => {
    const action = {
      type: actions.CLEAR_UNSAVED_CHANGES,
    };
    const expected = {
      ...initialState,
      hasUnsavedChanges: false,
    };
    expect(reducer(undefined, action)).toEqual(expected);
  });
  describe('PARSE_SNIPPET', () => {
    it('should return the state if the snippet has not been processed by the web worker', () => {
      const snippet = 'Grasssss tastes bad';
      const action = {
        type: actions.PARSE_SNIPPET,
        meta: {
          WebWorker: true,
        },
        payload: {
          snippet,
        },
      };
      const expected = initialState;
      expect(reducer(undefined, action)).toEqual(initialState);
    });
    it('should set the AST and filters after parsing the snippet', () => {
      const AST = {
        "type": "file_input",
        "begin": 0,
        "end": 1,
        "children": [
          "NEWLINE",
          "INDENT",
          "NEWLINE",
          "DEDENT"
        ]
      };
      const ruleCounts = {
        file_input: 1
      }
      const action = {
        type: actions.PARSE_SNIPPET,
        payload: {
          AST,
          ruleCounts,
        },
      };
      const expected = {
        ...initialState,
        AST,
        filters: {},
      };
      expect(reducer(undefined, action)).toEqual(expected);
    });
  });
  it('should handle SAVE_STATE_SUCCEEDED', () => {
    const state = {
      hasUnsavedChanges: true,
    };
    const action = {
      type: actions.SAVE_STATE_SUCCEEDED,
    };
    const expected = {
      hasUnsavedChanges: false,
    };
    expect(reducer(state, action)).toEqual(expected);
  });
});
