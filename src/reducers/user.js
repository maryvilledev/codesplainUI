import * as actions from '../actions/user';

export const initialState = {
  token: '',
  username: '',
  userSnippets: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_USER_SNIPPETS: {
      return {
        ...state,
        userSnippets: action.payload,
      }
    }
    case actions.RESTORE_USER_CREDENTIALS: {
      return {
        ...state,
        ...action.payload,
      }
    }
    case actions.SAVE_USERNAME: {
      return {
        ...state,
        username: action.payload,
      };
    }
    case actions.SAVE_ACCESS_TOKEN: {
      return {
        ...state,
        token: action.payload,
      };
    }
    case actions.CLEAR_USER_CREDENTIALS: {
      return {
        ...initialState
      };
    }
    default: {
      return state;
    }
  }
};
