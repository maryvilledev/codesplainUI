import * as actions from '../actions/parser';

const initialState = {
  language: '',
  error: null,
};

const parser = (state = initialState, action) => {
  switch (action.type) {
  case actions.LOAD_PARSER: {
    if (action.meta) {
        // Missed the middleware somehow
      return state;
    }
    const language = action.payload;
    return { ...state, language };
  }
  case actions.SET_ERROR: {
    const error = action.payload;
    return {
      ...state,
      error,
    };
  }
  case actions.SET_NO_ERROR: {
    return {
      ...state,
      error: null,
    };
  }
  default: {
    return state;
  }
  }
};

export default parser;
