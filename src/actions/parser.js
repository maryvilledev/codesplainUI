export const LOAD_PARSER = 'LOAD_PARSER';
export const ADD_ERROR = 'ADD_ERROR';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';

export const loadParser = language => ({
  type: LOAD_PARSER,
  meta: {
    WebWorker: true,
  },
  payload: language,
});

export const addError = error => ({
  type: ADD_ERROR,
  payload: error,
});

export const clearErrors = () => ({
  type: CLEAR_ERRORS,
});
