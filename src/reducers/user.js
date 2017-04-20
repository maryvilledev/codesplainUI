import * as actions from '../actions/user';

export const initialState = {
  orgs: [],
  selectedOrg: null,
  token: '',
  username: '',
  userSnippets: {},
}

const user = (state=initialState, action) => {
  switch (action.type) {
    case actions.ADD_ORG: {
      const org = action.payload;
      if(state.orgs.indexOf(org) >= 0) {
        return state;
      } else {
        return {
          ...state,
          orgs: state.orgs.slice().concat(org)
        };
      }
    }
    case actions.SWITCH_ORG: {
      const org = action.payload;
      if (state.orgs.indexOf(org) >= 0) {
        return {
          ...state,
          selectedOrg: org
        };
      } else {
        return state;
      }
    }
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
        ...initialState,
        orgs: state.orgs,
        selectedOrg: state.selectedOrg
      };
    }
    default: {
      return state;
    }
  }
};

export default user;
