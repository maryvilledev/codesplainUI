import {
  parseSnippet,
  setSnippetContents,
} from './app';
import {
  fetchGist as makeFetchGistRequest,
  fetchGists as makeFetchGistsRequest,
} from '../util/requests';

export const SET_GISTS = 'SET_GISTS';

export const setGists = gists => ({
  type: SET_GISTS,
  payload: gists,
});

export const fetchGist = url => dispatch => (
  makeFetchGistRequest(url)
    .then((contents) => {
      dispatch(setSnippetContents(contents));
      dispatch(parseSnippet(contents));
    })
);

export const fetchGists = () => (dispatch, getState) => {
  const { token } = getState().user;
  return makeFetchGistsRequest(token)
    .then((gists) => { dispatch(setGists(gists)); });
};
