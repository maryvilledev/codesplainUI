import axios from 'axios';


import { addNotification, closeNotification } from './notifications';
import { setAuthor, setPermissions } from './permissions';
import { fetchSnippetLists } from './user';
import { removeDeprecatedFiltersFromState } from '../util/codemirror-utils';
import {
  makeDumpEndpointUrl,
  makeSaveEndpointUrl,
  normalizeState,
} from '../util/requests';
import { setDefaults } from '../util/state-management';

export const RESET_STATE = 'RESET_STATE';
export const EDIT_ANNOTATION = 'EDIT_ANNOTATION';
export const PARSE_SNIPPET = 'PARSE_SNIPPET';
export const RESET_RULE_FILTERS = 'RESET_RULE_FILTERS';
export const RESTORE_STATE = 'RESTORE_STATE';
export const SAVE_ANNOTATION = 'SAVE_ANNOTATION';
export const SAVE_SUCCEEDED = 'SAVE_SUCCEEDED';
export const SELECT_ALL_FILTERS = 'SELECT_ALL_FILTERS';
export const SET_AST = 'SET_AST';
export const SET_RULE_FILTERS = 'SET_RULE_FILTERS';
export const SET_SNIPPET_CONTENTS = 'SET_SNIPPET_CONTENTS';
export const SET_SNIPPET_LANGUAGE = 'SET_SNIPPET_LANGUAGE';
export const SET_SNIPPET_TITLE = 'SET_SNIPPET_TITLE';
export const TOGGLE_EDITING_STATE = 'TOGGLE_EDITING_STATE';
export const SET_SNIPPET_KEY = 'SET_SNIPPET_KEY';

export const setSnippetKey = key => ({
  type: SET_SNIPPET_KEY,
  payload: key,
});

export const resetState = () => ({
  type: RESET_STATE,
});

export const setSnippetContents = snippet => ({
  type: SET_SNIPPET_CONTENTS,
  payload: snippet,
});

export const setRuleFilters = filters => ({
  type: SET_RULE_FILTERS,
  payload: filters,
});

export const selectAllFilters = () => ({
  type: SELECT_ALL_FILTERS,
});

export const resetFilters = () => ({
  type: RESET_RULE_FILTERS,
});

export const setAST = AST => ({
  type: SET_AST,
  payload: AST,
});

export const toggleEditState = () => ({
  type: TOGGLE_EDITING_STATE,
});

export const saveAnnotation = annotationData => ({
  type: SAVE_ANNOTATION,
  payload: annotationData,
});

export const restoreState = savedState => ({
  type: RESTORE_STATE,
  payload: savedState,
});

export const setSnippetTitle = snippetTitle => ({
  type: SET_SNIPPET_TITLE,
  payload: snippetTitle,
});

export const setSnippetLanguage = snippetLanguage => ({
  type: SET_SNIPPET_LANGUAGE,
  payload: snippetLanguage,
});

export const parseSnippet = snippet => ({
  type: PARSE_SNIPPET,
  meta: {
    WebWorker: true,
  },
  payload: {
    snippet,
  },
});

export const saveSucceeded = () => ({
  type: SAVE_SUCCEEDED,
});

export const saveNew = org => (dispatch, getState) => {
  // Load the token from cookie storage
  const {
    app: appState,
    user: { token },
  } = getState();
  // Construct the necessary request objects
  const reqBody = JSON.stringify(appState);
  const headers = {
    Authorization: token,
  };
  // This function is run by axios prior to sending POST request.
  // It transforms data that is sent in the request by removing extra
  // fields from the state object.
  const transformRequest = [
    (data) => {
      const dataObj = JSON.parse(data);
      return JSON.stringify(normalizeState(dataObj));
    },
  ];
  const config = { headers, transformRequest };
  dispatch(addNotification('Saving...'));
    // Save the new snippet
  return axios.post(makeSaveEndpointUrl(org), reqBody, config)
      .then((res) => {
        // Remove the 'saving...' notification
        dispatch(closeNotification());
        // Give user feedback that saving succeeded
        dispatch(addNotification('Codesplaination Saved!'));
        // Clear the hasUnsavedChanges flag
        dispatch(saveSucceeded());
        // Update the user's personal and organization snippet lists
        dispatch(fetchSnippetLists());
        // Update the snippet's key
        dispatch(setSnippetKey(res.data.key));
        const permissions = {
          canRead: true,
          canEdit: true,
        }; // Grant all permissions, this is now her file.
        dispatch(setPermissions(permissions));
        // Return the key of the newly-saved snippet so that the browser
        // location can be updated
        return res.data.key;
      }, () => {
        // Give user feedback that saving failed
        dispatch(addNotification('Failed to save snippet; please try again'));
      });
};

export const saveExisting = () => (dispatch, getState) => {
    // Get the app state to save (and the snippet title to save to)
  const {
    app: appState,
    user: {
      token,
      selectedOrg,
    },
  } = getState();
  const { snippetKey: key } = appState;

    // Construct the necessary request objects
  const reqBody = JSON.stringify(appState);
  const headers = {
    Authorization: token,
  };
  const transformRequest = [
    (data) => {
      const dataObj = JSON.parse(data);
      return JSON.stringify(normalizeState(dataObj));
    },
  ];
  const config = { headers, transformRequest };
  dispatch(addNotification('Saving...'));
    // Update the snippet
  return axios.put(makeSaveEndpointUrl(selectedOrg, key), reqBody, config)
      .then(() => {
        // Remove the 'saving...' notification
        dispatch(closeNotification());
        // Give user feedback that saving succeeded
        dispatch(addNotification('Codesplaination Saved!'));
        // Clear the hasUnsavedChanges flag
        dispatch(saveSucceeded());
        // Update the user's personal and organization snippet lists
        dispatch(fetchSnippetLists());
      }, () => {
        // Give user feedback that saving failed
        dispatch(addNotification('Failed to save snippet; please try again'));
      });
};

export const deleteSnippet = snippetKey => (dispatch, getState) => {
  // Get items out of app state
  const {
    user: {
      token,
      selectedOrg,
    },
  } = getState();

  // Construct request objects
  const reqHeaders = {
    headers: {
      Authorization: token,
    },
  };

  // Delete the snippet
  dispatch(addNotification('Deleting...'));
  return axios.delete(makeSaveEndpointUrl(selectedOrg, snippetKey), reqHeaders)
    .then(() => {
      // Remove the 'deleting...' notifications
      dispatch(closeNotification());
      // Give user feedback that snippet deleted
      dispatch(addNotification('Snippet Deleted!'));

      // Update state to reflect deletion of snippet
      dispatch(resetState());
      dispatch(setAuthor(''));
      dispatch(fetchSnippetLists()); // Update org snippet lists
    })
    .catch((err) => {
      // Remove the 'deleting...' notifications
      dispatch(closeNotification());
      // Show an error notification
      dispatch(addNotification('Failed to delete snippet; please try again'));
      throw err;
    });
};

export const downloadZip = selectedOrg => (dispatch) => {
  dispatch(addNotification('Downloading snippets zip file.'));
  return axios.post(makeDumpEndpointUrl(selectedOrg))
    .then(({ data: url }) => {
      dispatch(closeNotification());
      dispatch(addNotification('Successfully downloaded zip file!'));
      window.location = url;
    })
    .catch((err) => {
      dispatch(closeNotification());
      dispatch(addNotification('Failed to download snippets zip.'));
      throw err;
    });
};

export const loadSnippet = (snippetOwner, snippetKey) => (dispatch, getState) => {
  const { token } = getState().user;
  const reqHeaders = {
    Authorization: token,
  };
  return axios({
    method: 'GET',
    url: makeSaveEndpointUrl(snippetOwner, snippetKey),
    headers: reqHeaders,
    transformResponse: [
      (data) => {
        const dataObj = JSON.parse(data);
        return setDefaults(removeDeprecatedFiltersFromState(normalizeState(dataObj)));
      },
    ],
  })
    .then(({ data: appState }) => {
      // Restore the application's state
      dispatch(restoreState(appState));
      dispatch(setSnippetKey(snippetKey));
      dispatch(setAuthor(snippetOwner));
    });
};
