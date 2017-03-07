import * as actions from '../../src/actions/snippets';

describe('snippet actions', () => {
  it('creates an action to set the snippet contents', () => {
    const snippetContents = 'show me what you got';
    const expected = {
      type: "SET_SNIPPET_CONTENTS",
      payload: snippetContents,
    };
    expect(actions.setSnippetContents(snippetContents)).toEqual(expected);
  });
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
      type: "SET_RULE_FILTERS",
      payload: filters
    };
    expect(actions.setRuleFilters(filters)).toEqual(expected);
  });
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
      type: "SET_AST",
      payload: AST
    };
    expect(actions.setAST(AST)).toEqual(expected);
  });
  it('creates an action that toggles the editing state', () => {
    const expected = {
      type: "TOGGLE_EDITING_STATE",
    };
    expect(actions.toggleEditState()).toEqual(expected);
  });
  it('creates an action that adds an annotation', () => {
    const annotationData = {
      free: ['Frank'],
      projects: ['Flood the School' : ['Donnie']]
    };
    const expected = {
      type: "ADD_ANNOTATION",
      payload: savedState
    };
    expect(actions.addAnnotation(savedState)).toEqual(expected);
  });
  it('creates an action that edit an annotation', () => {
    const annotationData = {
      annotation: 'some annotations',
      lineNumber: 1,
      lineText: 'some line from a code snippet',
    };
    const expected = {
      type: "EDIT_ANNOTATION",
      payload: savedState
    };
    expect(actions.editAnnotation(annotationData)).toEqual(expected);
  });
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
      type: "RESTORE_STATE",
      payload: savedState
    };
    expect(actions.restoreState(savedState)).toEqual(expected);
  });
});
