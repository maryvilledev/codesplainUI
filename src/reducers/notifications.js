import * as actions from '../actions/notifications';

export const initialState = {
  displaying: false,
  notifications: [],
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
  case actions.ADD_NOTIFICATION: {
    // Append the message to the queue
    return {
      ...state,
      notifications: state.notifications.concat(payload),
      displaying: true,
    };
  }
  case actions.CLOSE_NOTIFICATION: {
    // Return initial state if this is the last notification in the queue
    if (state.notifications.length === 1) {
      return {
        ...initialState,
      };
    }
    // Return the state sans the previously displayed notification
    return {
      ...state,
      notifications: state.notifications.slice(1),
    };
  }
  default: {
    return state;
  }
  }
};
