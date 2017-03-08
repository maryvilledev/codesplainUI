import * as actions from '../../src/actions/app';
import reducer, { initialState } from '../../src/reducers/app';

describe('Reducer: Snippets', () => {
  it('should have initial state', () => {
    const initialState = {
      snippet: '',
      snippetTitle: '',
      annotations: {},
      filters: {},
      AST: {},
      readOnly: false,
    };
    expect(reducer(undefined, {})).toEqual(initialState);
  });
  it('should handle SET_SNIPPET_CONTENTS', () => {
    const snippet = 'Show me what you got';
    const action = {
      type: actions.SET_SNIPPET_CONTENTS,
      payload: snippet,
    };
    const expected = {
      ...initialState,
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
      filters: action.payload
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
    }
    expect(reducer(undefined, action)).toEqual(expect.objectContaining({snippetTitle}))
  })
});
