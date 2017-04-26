export const LOAD_PARSER = 'LOAD_PARSER';
export const SET_ERROR = 'SET_ERROR';
export const SET_NO_ERROR = 'SET_NO_ERROR';

export const loadParser = language => ({
  type: LOAD_PARSER,
  meta: {
    WebWorker: true,
  },
  payload: language,
});

export const setError = error => ({
  type: SET_ERROR,
  payload: error,
});

export const setNoError = () => ({
  type: SET_NO_ERROR,
});
