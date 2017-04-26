import * as actions from '../../src/actions/notifications';

describe('Actions: notifications:', () => {
  describe('addNotification', () => {
    it('creates correct action object', () => {
      const notification = 'Wubba lubba dub dub!';
      expect(actions.addNotification(notification)).toMatchSnapshot();
    });
  });
  describe('closeNotification', () => {
    it('creates correct action object', () => {
      expect(actions.closeNotification()).toMatchSnapshot();
    });
  });
});
