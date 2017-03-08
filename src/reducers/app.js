import * as actions from '../actions/app';

export const initialState = {
  snippet: '',
  snippetTitle: '',
  annotations: {},
  filters: {},
  AST: {},
  readOnly: false,
};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_SNIPPET_CONTENTS: {
      return Object.assign({}, state, {
        snippet: action.payload,
      });
    }
    case actions.SET_RULE_FILTERS: {
      return Object.assign({}, state, {
        filters: action.payload,
      });
    }
    case actions.TOGGLE_EDITING_STATE: {
      return Object.assign({}, state, {
        readOnly: !state.readOnly,
      });
    }
    case actions.SET_AST: {
      return Object.assign({}, state, {
        AST: action.payload,
      });
    }
    case actions.SAVE_ANNOTATION: {
      return Object.assign({}, state, {
        annotations: Object.assign({}, state.annotations, {
          [action.payload.lineNumber]: action.payload,
        }),
      });
    }
    case actions.RESTORE_STATE: {
      return Object.assign({}, action.payload);
    }
    default: {
      return state;
    }
  }
}

export default AppReducer;
