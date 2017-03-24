import * as actions from '../actions/parser';

const initialState = {
  state: actions.LOADING,
  parser: null
}

const parser = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_PARSER_STATE: {
      const nextState = action.payload;
      if (nextState !== actions.LOADING && nextState !== actions.LOADED) {
        return state;
      } else {
        return {...state, state: nextState}
      }
    }
    case actions.LOAD_PARSER: {
      const parser = action.payload;
      return {...state, parser}
    }
    default: {
      return state
    }
  }
}

export default parser;
