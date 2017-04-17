import * as actions from '../../src/actions/app';
import reducer, { initialState } from '../../src/reducers/app';

jest.mock('../../src/util/codemirror-utils', () => ({
  generateFilters: jest.fn(() => ({}))
}));

describe('Reducer: App', () => {
  describe('initialState', () => {
    it('matches snapshot', () => {
      expect(initialState).toMatchSnapshot();
    });
  });
  it('handles SET_SNIPPET_KEY', () => {
    const snippetKey = 'szechuan sauce';
    const action = {
      type: actions.SET_SNIPPET_KEY,
      payload: snippetKey,
    };
    const expected = {
      snippetKey
    }
    expect(reducer({}, action)).toEqual(expected);
  });
  it('handles RESET_STATE', () => {
    const action = {
      type: actions.RESET_STATE,
    };
    const state = {
      foo: 'bar',
      spam: 'eggs',
    };
    expect(reducer(state, action)).toEqual(initialState);
  });
  it('handles SET_SNIPPET_CONTENTS', () => {
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
  it('handles TOGGLE_EDITING_STATE', () => {
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
  it('handles SET_RULE_FILTERS', () => {
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
  it('handles RESET_RULE_FILTERS', () => {
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
      type: actions.RESET_RULE_FILTERS,
    }
    const expected = {
      filters: {
        'for_stmt': {
          prettyTokenName: 'For Loops',
          count: 1,
          selected: false
        },
        'atom': {
          prettyTokenName: 'Atoms',
          count: 21,
          selected: false
        },
      },
    };
    expect(reducer({ filters }, action)).toEqual(expected);
  });
  it('handles SELECT_ALL_FILTERS', () => {
    const filters = {
      'for_stmt': {
        prettyTokenName: 'For Loops',
        count: 1,
        selected: false
      },
      'atom': {
        prettyTokenName: 'Atoms',
        count: 21,
        selected: false,
      },
    };
    const action = {
      type: actions.SELECT_ALL_FILTERS,
    }
    const expected = {
      filters: {
        'for_stmt': {
          prettyTokenName: 'For Loops',
          count: 1,
          selected: true,
        },
        'atom': {
          prettyTokenName: 'Atoms',
          count: 21,
          selected: true,
        },
      },
    };
    expect(reducer({ filters }, action)).toEqual(expected);
  });
  it('handles SET_AST', () => {
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
  it('handles SAVE_ANNOTATION', () => {
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
  it('handles RESTORE_STATE', () => {
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
    const expected = {
      ...savedState,
      hasUnsavedChanges: false,
    };
    expect(reducer(undefined, action)).toEqual(expected);
  });
  it('handles SET_SNIPPET_TITLE', () => {
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
  it('handles SET_SNIPPET_LANGUAGE', () => {
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
  it('handles CLEAR_UNSAVED_CHANGES', () => {
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
  it('handles SAVE_SUCCEEDED', () => {
    const state = {
      hasUnsavedChanges: true,
    };
    const action = {
      type: actions.SAVE_SUCCEEDED,
    };
    const expected = {
      hasUnsavedChanges: false,
    };
    expect(reducer(state, action)).toEqual(expected);
  });
});
