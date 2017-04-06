import axios from 'axios';
import cookie from 'react-cookie';

export const CLEAR_UNSAVED_CHANGES = 'CLEAR_UNSAVED_CHANGES';
export const EDIT_ANNOTATION = 'EDIT_ANNOTATION';
export const PARSE_SNIPPET = 'PARSE_SNIPPET';
export const RESTORE_STATE = 'RESTORE_STATE';
export const RESET_RULE_FILTERS = 'RESET_RULE_FILTERS';
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
export const SELECT_ALL_FILTERS = 'SELECT_ALL_FILTERS';
export const SET_USER_SNIPPETS = 'SET_USER_SNIPPETS';
export const UPDATE_USER_SNIPPETS_STARTED = 'UPDATE_USER_SNIPPETS_STARTED';
export const UPDATE_USER_SNIPPETS_SUCCEEDED = 'UPDATE_USER_SNIPPETS_SUCCEEDED';
export const UPDATE_USER_SNIPPETS_FAILED = 'UPDATE_USER_SNIPPETS_FAILED';
export const UPDATE_USER_SNIPPETS = 'UPDATE_USER_SNIPPETS';

const API_URL = process.env.REACT_APP_API_URL;

export const setSnippetContents = (snippet) => ({
  type: SET_SNIPPET_CONTENTS,
  payload: snippet,
});

export const setRuleFilters = (filters) => ({
  type: SET_RULE_FILTERS,
  payload: filters,
});

export const selectAllFilters = () => ({
  type: SELECT_ALL_FILTERS,
});

export const resetFilters = () => ({
  type: RESET_RULE_FILTERS,
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

export const clearUnsavedChanges = () => ({
  type: CLEAR_UNSAVED_CHANGES,
})

export const saveStateStarted = () => ({
  type: SAVE_STATE_STARTED,
});

export const saveStateSucceeded = () => ({
  type: SAVE_STATE_SUCCEEDED,
});

export const saveStateFailed = () => ({
  type: SAVE_STATE_FAILED,
});

export const setUserSnippets = (snippetMeta) => ({
  type: SET_USER_SNIPPETS,
  payload: snippetMeta,
});

export const updateUserSnippetsStarted = () => ({
  type: UPDATE_USER_SNIPPETS_STARTED,
});

export const updateUserSnippetsSucceeded = () => ({
  type: UPDATE_USER_SNIPPETS_SUCCEEDED,
});

export const updateUserSnippetsFailed = () => ({
  type: UPDATE_USER_SNIPPETS_FAILED,
});

export const updateUserSnippets = () => {
  return (dispatch) => {
    // Load requisite cookies, return Promise if they aren't present
    const token    = cookie.load('token');
    const username = cookie.load('username');
    if (!token || !username) {
      return Promise.resolve();
    }

    // Fetch the user's snippet meta data and save it
    const headers = {
      Accept: 'application/json',
      Authorization: `token ${token}`,
    };
    dispatch(updateUserSnippetsStarted());
    return axios.get(`${API_URL}/users/${username}/snippets`, { headers })
      .then(
        res => {
          dispatch(setUserSnippets(res));
          dispath(updateUserSnippetsSucceeded());
        },
        err => dispatch(updateUserSnippetsFailed)
      );
  };
};

export const saveState = (id) => {
  return (dispatch, getState) => {
    // If the snippet has not been saved, then saving an annotation shouldn't
    // trigger a POST request to save the snippet (and its annotations)
    const username = cookie.load('username');
    if (id === undefined || !username) {
      // Return a Promise object to make this action "thenable"
      return Promise.resolve();
    }
    dispatch(saveStateStarted());
    // Get the app state and stringify it
    const stateString = JSON.stringify(getState().app);
    return axios.post(`${API_URL}/users/${username}/snippets/${id}`, { json: stateString, })
      .then((res) => {
        dispatch(saveStateSucceeded());
      }, (err) => {
        dispatch(saveStateFailed());
      });
  };
};
