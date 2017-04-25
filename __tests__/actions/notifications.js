import * as actions from '../../src/actions/notifications';

describe('Actions: notifications:', () => {
  describe('addNotification', () => {
    it('creates correct action object', () => {
      const notification = 'Wubba lubba dub dub!';
      const expected = {
        type: actions.ADD_NOTIFICATION,
        payload: notification,
      };
      expect(actions.addNotification(notification)).toEqual(expected);
    });
  });
  describe('closeNotification', () => {
    it('creates correct action object', () => {
      const expected = {
        type: actions.CLOSE_NOTIFICATION,
      };
      expect(actions.closeNotification()).toEqual(expected);
    });
  });
});
