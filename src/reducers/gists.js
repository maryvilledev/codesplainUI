import * as actions from '../actions/gists';

export const initialState = [];

const gists = (state = initialState, action) => {
  switch (action.type) {
  case actions.SET_GISTS: {
    return action.payload;
  }
  default: {
    return state;
  }
  }
};

export default gists;
