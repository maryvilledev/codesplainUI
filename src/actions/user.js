import axios from 'axios';
import cookie from 'react-cookie';

import { makeSaveEndpointUrl } from '../util/requests';

export const SET_USER_SNIPPETS = 'SET_USER_SNIPPETS';
export const UPDATE_USER_SNIPPETS_STARTED = 'UPDATE_USER_SNIPPETS_STARTED';
export const UPDATE_USER_SNIPPETS_SUCCEEDED = 'UPDATE_USER_SNIPPETS_SUCCEEDED';
export const UPDATE_USER_SNIPPETS_FAILED = 'UPDATE_USER_SNIPPETS_FAILED';
export const UPDATE_USER_SNIPPETS = 'UPDATE_USER_SNIPPETS';


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
    return axios.get(makeSaveEndpointUrl(username), { headers })
      .then(
        res => {
          dispatch(setUserSnippets(res.data));
          dispatch(updateUserSnippetsSucceeded());
        },
        err => dispatch(updateUserSnippetsFailed)
      );
  };
};
