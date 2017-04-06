import axios from 'axios';
import cookie from 'react-cookie';

import { makeSaveEndpointUrl } from '../util/requests';

export const EDIT_ANNOTATION = 'EDIT_ANNOTATION';
export const PARSE_SNIPPET = 'PARSE_SNIPPET';
export const RESET_RULE_FILTERS = 'RESET_RULE_FILTERS';
export const RESTORE_STATE = 'RESTORE_STATE';
export const SAVE_ANNOTATION = 'SAVE_ANNOTATION';
export const SAVE_FAILED = 'SAVE_FAILED';
export const SAVE_STARTED = 'SAVE_STARTED';
export const SAVE_SUCCEEDED = 'SAVE_SUCCEEDED';
export const SELECT_ALL_FILTERS = 'SELECT_ALL_FILTERS';
export const SET_AST = 'SET_AST';
export const SET_RULE_FILTERS = 'SET_RULE_FILTERS';
export const SET_SNIPPET_CONTENTS = 'SET_SNIPPET_CONTENTS';
export const SET_SNIPPET_LANGUAGE = 'SET_SNIPPET_LANGUAGE';
export const SET_SNIPPET_TITLE = 'SET_SNIPPET_TITLE';
export const TOGGLE_EDITING_STATE = 'TOGGLE_EDITING_STATE';

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

export const saveStarted = () => ({
  type: SAVE_STARTED,
});

export const saveSucceeded = () => ({
  type: SAVE_SUCCEEDED,
});

export const saveFailed = () => ({
  type: SAVE_FAILED,
});

export const saveNew = () => {
  return (dispatch, getState) => {
    // Load the token and username from cookie storage
    const token = cookie.load('token');
    const username = cookie.load('username');

    // Construct the necessary request objects
    const reqBody = JSON.stringify(getState().app);
    const reqHeaders = {
      headers: {
        Authorization: token,
      },
    };
    dispatch(saveStarted());
    // Save the new snippet
    return axios.post(makeSaveEndpointUrl(username), reqBody, reqHeaders)
      .then((res) => {
        dispatch(saveSucceeded());
        // Return the key of the newly-saved snippet so that the browser
        // location can be updated
        return res.data.key;
      }, () => {
        dispatch(saveFailed());
      });
  };
};

export const saveExisting = () => {
  return (dispatch, getState) => {
    // Load the token and username from cookie storage
    const token = cookie.load('token');
    const username = cookie.load('username');

    // Get the app state to save (and the snippet title to save to)
    const appState = getState().app;
    const { snippetTitle: title } = appState;

    // Construct the necessary request objects
    const reqBody = JSON.stringify(appState);
    const reqHeaders = {
      headers: {
        Authorization: token,
      },
    };
    dispatch(saveStarted());
    // Update the snippet
    return axios.put(makeSaveEndpointUrl(username, title), reqBody, reqHeaders)
      .then(() => {
        dispatch(saveSucceeded());
      }, () => {
        dispatch(saveFailed());
      });
  };
};
