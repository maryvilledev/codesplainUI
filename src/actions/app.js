export const SET_SNIPPET_CONTENTS = 'SET_SNIPPET_CONTENTS';
export const SET_RULE_FILTERS = 'SET_RULE_FILTERS';
export const SET_AST = 'SET_AST';
export const TOGGLE_EDITING_STATE = 'TOGGLE_EDITING_STATE';
export const SAVE_ANNOTATION = 'SAVE_ANNOTATION';
export const EDIT_ANNOTATION = 'EDIT_ANNOTATION';
export const RESTORE_STATE = 'RESTORE_STATE';

export const setSnippetContents = (snippet) => ({
  type: SET_SNIPPET_CONTENTS,
  payload: snippet,
});

export const setRuleFilters = (filters) => ({
  type: SET_RULE_FILTERS,
  payload: filters,
});

export const setAST = (AST) => ({
  type: SET_AST,
  payload: AST,
});

export const toggleEditState = () => ({
  type: TOGGLE_EDITING_STATE,
});

export const saveAnnotation = (annotationData) => ({
  type: SAVE_ANNOTATION,
  payload: annotationData,
});

export const editAnnotation = (annotationData) => ({
  type: EDIT_ANNOTATION,
  payload: annotationData,
});

export const restoreState = (savedState) => ({
  type: RESTORE_STATE,
  payload: savedState,
});
