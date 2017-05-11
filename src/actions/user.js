import axios from 'axios';
import _ from 'lodash';

import { makeSaveEndpointUrl, sanitizeSnippetList } from '../util/requests';

const API_URL = process.env.REACT_APP_API_URL;

// Util func to check for 'NoSuchKey' responses from S3
const noSuchKey = data => (
  typeof data === 'string' && data.includes('NoSuchKey')
);

export const ADD_ORG = 'ADD_ORG';
export const ADD_ORGANIZATIONS = 'ADD_ORGANIZATIONS';
export const CLEAR_USER_CREDENTIALS = 'CLEAR_USER_CREDENTIALS';
export const RESTORE_USER_CREDENTIALS = 'RESTORE_USER_CREDENTIALS';
export const SAVE_ACCESS_TOKEN = 'SAVE_ACCESS_TOKEN';
export const SAVE_USERNAME = 'SAVE_USERNAME';
export const SET_USER_SNIPPETS = 'SET_USER_SNIPPETS';
export const SET_SNIPPET_LISTS = 'SET_SNIPPET_LISTS';
export const SWITCH_ORG = 'SWITCH_ORG';
export const UPDATE_USER_SNIPPETS = 'UPDATE_USER_SNIPPETS';
export const UPDATE_USER_SNIPPETS_FAILED = 'UPDATE_USER_SNIPPETS_FAILED';
export const UPDATE_USER_SNIPPETS_STARTED = 'UPDATE_USER_SNIPPETS_STARTED';
export const UPDATE_USER_SNIPPETS_SUCCEEDED = 'UPDATE_USER_SNIPPETS_SUCCEEDED';

export const addOrg = org => ({
  type: ADD_ORG,
  payload: org,
});

export const addOrganizations = organizations => ({
  type: ADD_ORGANIZATIONS,
  payload: organizations,
});

export const clearUserCredentials = () => ({
  type: CLEAR_USER_CREDENTIALS,
});

export const saveAccessToken = accessToken => ({
  type: SAVE_ACCESS_TOKEN,
  payload: accessToken,
});

export const saveUsername = username => ({
  type: SAVE_USERNAME,
  payload: username,
});

export const setSnippetLists = snippetLists => ({
  type: SET_SNIPPET_LISTS,
  payload: snippetLists,
});

export const setUserSnippets = snippetMeta => ({
  type: SET_USER_SNIPPETS,
  payload: snippetMeta,
});

export const switchOrg = org => ({
  type: SWITCH_ORG,
  payload: org,
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

export const updateUserSnippets = () => (dispatch, getState) => {
  // Load requisite cookies, return Promise if they aren't present
  const {
    user: {
      token,
      username,
    },
  } = getState();
  // Fetch the user's snippet meta data and save it
  const headers = {
    Accept: 'application/json',
    Authorization: `token ${token}`,
  };
  dispatch(updateUserSnippetsStarted());
  return axios.get(makeSaveEndpointUrl(username), { headers })
    .then((res) => {
      // Jump to catch block if the user has no index.json file:
      if (noSuchKey(res.data)) {
        throw new Error(`index.json does not exist for ${username}!`);
      }
      dispatch(setUserSnippets(res.data));
      dispatch(updateUserSnippetsSucceeded());
    })
    .catch(() => {
      dispatch(updateUserSnippetsFailed());
    });
};

export const fetchSnippetLists = () => (dispatch, getState) => {
  const {
    token,
    orgs,
  } = getState().user;
  const headers = {
    Authorization: `token ${token}`,
  };
  const url = `${API_URL}/users?users=${orgs.join(',')}`;
  // Remove the username from the org list
  return axios({
    method: 'GET',
    url,
    headers,
  })
    .then(({ data: snippetLists }) => {
      const sanitizedSnippetLists = _.mapValues(snippetLists, sanitizeSnippetList);
      dispatch(setSnippetLists(sanitizedSnippetLists));
    });
};

export const fetchAccessToken = authCode => () => {
  const reqUrl = `${API_URL}/auth`;
  const reqBody = { code: authCode };
  return axios({
    method: 'POST',
    url: reqUrl,
    data: reqBody,
  });
};

export const fetchUserInfo = () => (dispatch, getState) => {
  const { token } = getState().user;
  const reqHeaders = {
    Accept: 'application/json',
    Authorization: `token ${token}`,
  };
  return axios({
    method: 'GET',
    url: 'https://api.github.com/user',
    headers: reqHeaders,
  });
};

export const restoreUserCredentials = (token, username) => ({
  type: RESTORE_USER_CREDENTIALS,
  payload: {
    token,
    username,
  },
});
