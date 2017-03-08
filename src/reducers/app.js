import * as actions from '../actions/app';

const initialState = {
  snippet: '',
  snippetTitle: '',
  annotations: {},
  filters: {},
  AST: {},
  readOnly: false,
};

const app = (state = initialState, action) => {
  switch (action.type) {
    default: {
      return state;
    }
  }
}

export default app;
