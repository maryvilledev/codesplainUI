export const ADD_NOTIFICATION = 'ADD_NOTIFICATION';
export const CLOSE_NOTIFICATION = 'CLOSE_NOTIFICATION';

export const addNotification = notification => ({
  type: ADD_NOTIFICATION,
  payload: notification,
});

export const closeNotification = () => ({
  type: CLOSE_NOTIFICATION,
});
