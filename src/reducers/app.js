import * as actions from '../actions/app';

const initialState = {
  snippet: '',
  snippetTitle: '',
  annotations: {},
  filters: {},
  AST: {},
  readOnly: false,
};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    default: {
      return state;
    }
  }
}

export default AppReducer;
