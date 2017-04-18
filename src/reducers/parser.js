import * as actions from '../actions/parser';

const initialState = {
  language: ''
}

const parser = (state = initialState, action) => {
  switch (action.type) {
    case actions.LOAD_PARSER: {
      if (action.meta) {
        //Missed the middleware somehow
        return state
      }
      const language = action.payload;
      return {...state, language}
    }
    default: {
      return state
    }
  }
}

export default parser;
