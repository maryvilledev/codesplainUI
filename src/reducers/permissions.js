import * as actions from '../actions/permissions';

const initialState = {
  canRead: false,
  canEdit: false,
};

const permissions = (state = initialState, action) => {
  switch (action.type) {
  case actions.SET_PERMISSIONS: {
    return { ...action.payload };
  }
  default: {
    return state;
  }
  }
};

export default permissions;
