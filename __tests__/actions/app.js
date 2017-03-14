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
});
