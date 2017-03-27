import * as actions from '../actions/parser';

const initialState = {
  parserURL: ''
}

const parser = (state = initialState, action) => {
  switch (action.type) {
    case actions.LOAD_PARSER: {
      const parserURL = action.payload;
      return {...state, parserURL}
    }
    default: {
      return state
    }
  }
}

export default parser;
