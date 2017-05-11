import * as actions from '../actions/permissions';

const initialState = {
  canRead: false,
  canEdit: false,
  author: '',
};

const permissions = (state = initialState, action) => {
  switch (action.type) {
  case actions.SET_PERMISSIONS: {
    return { ...state, ...action.payload };
  }
  case actions.SET_AUTHOR: {
    return { ...state, author: action.payload };
  }
  default: {
    return state;
  }
  }
};

export default permissions;
