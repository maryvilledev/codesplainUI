import * as actions from '../actions/app';
import { generateFilters } from '../util/rules';

export const initialState = {
  snippet: '',
  snippetTitle: '',
  annotations: {},
  filters: {},
  AST: {},
  readOnly: false,
};

const app = (state = initialState, action) => {
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
      if (state.readOnly) {
        return state;
      }
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
    case actions.SET_SNIPPET_TITLE: {
      return {
        ...state,
        snippetTitle: action.payload
      };
    }
    case actions.SET_SNIPPET_LANGUAGE: {
      return {
        ...state,
        snippetLanguage: action.payload,
      };
    }
    case actions.PARSE_SNIPPET: {
      if (action.meta) {
        return state;
      }
      const {
        AST,
        ruleCounts,
      } = action.payload;
      const filters = generateFilters(state.filters, ruleCounts);
      return {
        ...state,
        AST,
        filters,
      };
    }
    default: {
      return state;
    }
  }
}

export default app;
