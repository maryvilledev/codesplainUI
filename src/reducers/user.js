import * as actions from '../actions/user';

const defaultState = {
  orgs: [],
  selectedOrg: null
}

const user = (state=defaultState, action) => {
  switch (action.type) {
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
