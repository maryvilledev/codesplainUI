import * as actions from '../actions/app';
import { generateFilters } from '../util/rules';

import _ from 'lodash';

export const initialState = {
  annotations: {},
  AST: {},
  filters: {},
  hasUnsavedChanges: false,
  readOnly: false,
  snippet: '',
  snippetTitle: '',
};

const app = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_SNIPPET_CONTENTS: {
      return {
        ...state,
        hasUnsavedChanges: true,
        snippet: action.payload,
      };
    }
    case actions.SET_RULE_FILTERS: {
      return {
        ...state,
        filters: action.payload,
        hasUnsavedChanges: true,
      };
    }
    case actions.TOGGLE_EDITING_STATE: {
      if (state.readOnly) {
        return state;
      }
      return {
        ...state,
        hasUnsavedChanges: true,
        readOnly: !state.readOnly,
      };
    }
    case actions.SELECT_ALL_FILTERS: {
      const filters = _.mapValues(state.filters, (filter) => {
        if (filter.selected) {
          return filter;
        }
        return { ...filter, selected: true };
      });
      return {
        ...state,
        filters,
      }
    }
    case actions.RESET_RULE_FILTERS: {
      const filters = _.mapValues(state.filters, (filter) => {
        if (filter.selected) {
          return { ...filter, selected: false };
        }
        return filter;
      });
      return {
        ...state,
        filters,
      }
    }
    case actions.SET_AST: {
      return {
        ...state,
        AST: action.payload,
      };
    }
    case actions.SAVE_ANNOTATION: {
      return {
        ...state,
        annotations: {
          ...state.annotations,
          [action.payload.lineNumber]: action.payload,
        },
        hasUnsavedChanges: true,
      };
    }
    case actions.RESTORE_STATE: {
      return action.payload
    }
    case actions.SET_SNIPPET_TITLE: {
      return {
        ...state,
        hasUnsavedChanges: true,
        snippetTitle: action.payload
      };
    }
    case actions.SAVE_STATE_SUCCEEDED: {
      return {
        ...state,
        hasUnsavedChanges: false,
      }
    }
    case actions.SET_SNIPPET_LANGUAGE: {
      return {
        ...state,
        hasUnsavedChanges: true,
        snippetLanguage: action.payload,
      };
    }
    case actions.CLEAR_UNSAVED_CHANGES: {
      return {
        ...state,
        hasUnsavedChanges: false,
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
