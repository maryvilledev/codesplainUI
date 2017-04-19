import * as actions from '../actions/user';

const defaultState = {
  orgs: [],
  selectedOrg: null
}

const user = (state=defaultState, action) => {
  switch (action.type) {
    case actions.ADD_ORG: {
      const org = action.payload;
      if(state.orgs.includes(org)) {
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
      if (state.orgs.includes(org)) {
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
    default: {
      return state;
    }
  }
};

export default user;
