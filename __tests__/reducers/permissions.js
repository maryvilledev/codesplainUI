import * as actions from '../../src/actions/permissions';
import reducer from '../../src/reducers/permissions';

describe('Reducer: permissions', () => {
  it('should have initial state', () => {
    const initial = {
      permissions: {
        canRead: false,
        canWrite: false,
      }
    }
    expect(reducer(undefined, {})).toEqual(initial)
  })

  it('should handle SET_PERMISSIONS', () => {
    const permissions = {
      canRead: true,
      canEdit: false,
    };
    const action = {
      type: actions.SET_PERMISSIONS,
      payload: parserURL
    };
    const expected = {
      permissions
    };
    expect(reducer(undefined, action)).toEqual(expect.objectContaining(expected))
  })
})
