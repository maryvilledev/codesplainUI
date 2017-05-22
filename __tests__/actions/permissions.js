import * as actions from '../../src/actions/permissions';

describe('Actions: permissions', () => {
  describe('SET_PERMISSIONS', () => {
    it('creates an action to set permissions', () => {
      const permissions = {
        canRead: true,
        canEdit: false,
      };
      expect(actions.setPermissions(permissions)).toMatchSnapshot();
    });
  });
  describe('SET_AUTHOR', () => {
    it('creates an action to set the author', () => {
      const author = 'phoenixperson';
      expect(actions.setAuthor(author)).toMatchSnapshot();
    });
  });
});
