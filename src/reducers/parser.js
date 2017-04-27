import * as actions from '../actions/parser';

const initialState = {
  language: '',
  errors: [],
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
  case actions.ADD_ERROR: {
    const errors = state.errors.concat(action.payload);
    return {
      ...state,
      errors,
    };
  }
  case actions.CLEAR_ERRORS: {
    return {
      ...state,
      errors: [],
    };
  }
  default: {
    return state;
  }
  }
};

export default parser;
