import * as actions from '../../src/actions/user';
import reducer from '../../src/reducers/user';

describe('Reducer: User', () => {
  it('shoud have initial state', () => {
    const initial = {
      orgs: [],
      selectedOrg: null
    };
    expect(reducer(undefined, {})).toEqual(initial);
  });

  it('should handle ADD_ORG', () => {
    const org = 'galactic-federation';
    const action = {
      type: actions.ADD_ORG,
      payload: org
    }
    expect(reducer(undefined, action).orgs).toEqual(expect.arrayContaining([org]))
  });

  describe('SWITCH_ORG', () => {
    const state = {};
    const validOrg = 'galactic-federation';
    const invalidOrg = 'international-counsel-of-ricks';
    beforeEach(() => {
      state.orgs = [validOrg];
      state.selectedOrg = null
    });
    it('should set the org if the org exists', () => {
      const action = {
        type: actions.SWITCH_ORG,
        payload: validOrg
      };
      expect(reducer(state, action).selectedOrg).toEqual(validOrg);
    });
    it('shouldn\'t set the org if the org doesn\'t exists', () => {
      const action = {
        type: actions.SWITCH_ORG,
        payload: invalidOrg
      };
      expect(reducer(state, action).selectedOrg).toBe(null);
    });
  });

  it('should handle SET_USER_SNIPPETS', () => {
    const userSnippets = {
      'test_snippet_1': {
        snippetName: 'Test Snippet 1',
        language:    'Python 3',
        lastEdited:  '2017-04-05T12:52:20.099Z',
      },
      'test_snippet_2': {
        snippetName: 'Test Snippet 2',
        language:    'Python 3',
        lastEdited:  '2017-04-05T12:52:20.099Z',
      }
    };
    const action = {
      type: actions.SET_USER_SNIPPETS,
      payload: userSnippets,
    };
    const expected = { userSnippets };
    expect(reducer(undefined, action)).toEqual(expect.objectContaining(expected));
  });
});
