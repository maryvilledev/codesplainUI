import * as actions from '../../src/actions/notifications';
import reducer, { initialState } from '../../src/reducers/notifications';

describe('Reducer: notifications: ', () => {
  describe('initialState', () => {
    it('matches snapshot', () => {
      expect(initialState).toMatchSnapshot();
    });
  });
  it('returns state on unknown action types', () => {
    const state = { foo: 'bar' };
    expect(reducer(state, {})).toEqual(state);
  });
  it('handles ADD_NOTIFICATION', () => {
    const notification = 'Wubba lubba dub dub!';
    const action = {
      type: actions.ADD_NOTIFICATION,
      payload: notification,
    };
    const state = { notifications: [], displaying: false };
    const expected = {
      ...state,
      notifications: [notification],
      displaying: true,
    };
    expect(reducer(state, action)).toEqual(expected);
  });
  describe('CLOSE_NOTIFICATION', () => {
    it('removes the leading notification from state', () => {
      const action = {
        type: actions.CLOSE_NOTIFICATION,
      };
      const state = {
        notifications: [
          'one',
          'two',
        ],
        displaying: true,
      };
      const expected = {
        notifications: ['two'],
        displaying: true,
      };
      expect(reducer(state, action)).toEqual(expected);
    });
    it('reverts to initialState when there are no more notifications', () => {
      const action = {
        type: actions.CLOSE_NOTIFICATION,
      };
      const state = {
        notifications: ['last notification'],
        displaying: true,
      };
      const expected = { ...initialState };
      expect(reducer(state, action)).toEqual(expected);
    });
  });
});
