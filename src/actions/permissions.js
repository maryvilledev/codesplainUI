export const SET_PERMISSIONS = 'SET_PERMISSIONS';
export const SET_AUTHOR = 'SET_AUTHOR';

export const setPermissions = permissions => ({
  type: SET_PERMISSIONS,
  payload: permissions,
});

export const setAuthor = author => ({
  type: SET_AUTHOR,
  payload: author,
});
