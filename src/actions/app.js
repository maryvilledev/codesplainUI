import axios from 'axios';

export const EDIT_ANNOTATION = 'EDIT_ANNOTATION';
export const PARSE_SNIPPET = 'PARSE_SNIPPET';
export const RESTORE_STATE = 'RESTORE_STATE';
export const SAVE_ANNOTATION = 'SAVE_ANNOTATION';
export const SET_AST = 'SET_AST';
export const SET_RULE_FILTERS = 'SET_RULE_FILTERS';
export const SET_SNIPPET_CONTENTS = 'SET_SNIPPET_CONTENTS';
export const SET_SNIPPET_LANGUAGE = 'SET_SNIPPET_LANGUAGE';
export const SET_SNIPPET_TITLE = 'SET_SNIPPET_TITLE';
export const TOGGLE_EDITING_STATE = 'TOGGLE_EDITING_STATE';
export const SAVE_STATE = 'SAVE_STATE';
export const SAVE_STATE_STARTED = 'SAVE_STATE_STARTED';
export const SAVE_STATE_SUCCEEDED = 'SAVE_STATE_SUCCEEDED';
export const SAVE_STATE_FAILED = 'SAVE_STATE_FAILED';


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

export const restoreState = (savedState) => ({
  type: RESTORE_STATE,
  payload: savedState,
});

export const setSnippetTitle = (snippetTitle) => ({
  type: SET_SNIPPET_TITLE,
  payload: snippetTitle
})

export const setSnippetLanguage = (snippetLanguage) => ({
  type: SET_SNIPPET_LANGUAGE,
  payload: snippetLanguage
});

export const parseSnippet = (snippet) => ({
  type: PARSE_SNIPPET,
  meta: {
    WebWorker: true,
  },
  payload: {
    snippet,
  },
});

export const saveStateStarted = () => ({
  type: SAVE_STATE_STARTED,
});

export const saveStateSucceeded = () => ({
  type: SAVE_STATE_SUCCEEDED,
});

export const saveStateFailed = () => ({
  type: SAVE_STATE_FAILED,
});

export const saveState = (id) => {
  return (dispatch, getState) => {
    // If the snippet has not been saved, then saving an annotation shouldn't
    // trigger a POST request to save the snippet (and its annotations)
    if (id === undefined) {
      // Return a Promise object to make this action "thenable"
      return Promise.resolve();
    }
    dispatch(saveStateStarted());
    // Get the app state and stringify it
    const stateString = JSON.stringify(getState().app);

    // TODO: Dispatch action to show the snackbar with a relevant message based on the results
    // Return the results of the POST request
    return axios.post(`api/snippets/${id}`, { json: stateString, })
      .then((res) => {
        dispatch(saveStateSucceeded());
      }, (err) => {
        dispatch(saveStateFailed());
      });
  };
};
