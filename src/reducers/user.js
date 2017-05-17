import _ from 'lodash';

import * as actions from '../actions/user';

export const initialState = {
  avatarUrl: '',
  orgs: [],
  selectedOrg: null,
  token: '',
  username: '',
  userSnippets: {},
  orgSnippets: {},
};

const user = (state = initialState, action) => {
  switch (action.type) {
  case actions.SET_AVATAR_URL: {
    const url = action.payload;
    return {
      ...state,
      avatarUrl: url,
    };
  }
  case actions.ADD_ORG: {
    return {
      ...state,
      orgs: _.union(state.orgs, [action.payload]),
    };
  }
  case actions.ADD_ORGANIZATIONS: {
    return {
      ...state,
      orgs: _.union(state.orgs, action.payload),
    };
  }
  case actions.CLEAR_USER_CREDENTIALS: {
    return {
      ...initialState,
      orgs: state.orgs,
      selectedOrg: state.selectedOrg,
    };
  }
  case actions.SAVE_ACCESS_TOKEN: {
    return {
      ...state,
      token: action.payload,
    };
  }
  case actions.SAVE_USERNAME: {
    return {
      ...state,
      username: action.payload,
    };
  }
  case actions.SET_USER_SNIPPETS: {
    return {
      ...state,
      userSnippets: action.payload,
    };
  }
  case actions.SET_SNIPPET_LISTS: {
    const userSnippets = _.get(action.payload, state.username);
    const orgSnippets = _.omit(action.payload, state.username);
    return {
      ...state,
      orgSnippets,
      userSnippets,
    };
  }
  case actions.SWITCH_ORG: {
    const org = action.payload;
    if (state.orgs.indexOf(org) !== -1) {
      return {
        ...state,
        selectedOrg: org,
      };
    }
    return state;
  }
  default: {
    return state;
  }
  }
};

export default user;
