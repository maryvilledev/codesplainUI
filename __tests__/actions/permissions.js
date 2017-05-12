import * as actions from '../../src/actions/permissions';

describe('Actions: permissions', () => {
  describe('SET_PERMISSIONS', () => {
    it('creates an action to set permissions', () => {
      const permissions = {
        canRead: true,
        canEdit: false,
      };
      const expected = {
        type: actions.SET_PERMISSIONS,
        payload: permissions,
      };
      expect(actions.setPermissions(permissions)).toEqual(expected);
    });
  });
  describe('SET_AUTHOR', () => {
    it('creates an action to set the author', () => {
      const author = 'phoenixperson';
      const expected = {
        type: actions.SET_AUTHOR,
        payload: author,
      };
      expect(actions.setAuthor(author)).toEqual(expected);
    });
  });
});
