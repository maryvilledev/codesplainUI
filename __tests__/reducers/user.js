import * as actions from '../../src/actions/user';
import reducer, { initialState } from '../../src/reducers/user';

describe('Reducer: User', () => {
  it('shoud have initial state', () => {
    const initial = {
      orgs: [],
      selectedOrg: null,
      token: '',
      userSnippets: {},
      username: '',
    };
    expect(reducer(undefined, {})).toEqual(initial);
  });

  it('handles SAVE_USERNAME', () => {
    const username = 'username';
    const action = {
      type: actions.SAVE_USERNAME,
      payload: username,
    };
    const expected = {
      username,
    };
    expect(reducer({}, action)).toEqual(expected);
  });

  it('handles SAVE_ACCESS_TOKEN', () => {
    const token = 'token';
    const action = {
      type: actions.SAVE_ACCESS_TOKEN,
      payload: token,
    };
    const expected = {
      token,
    };
    expect(reducer({}, action)).toEqual(expected);
  });

  it('handles CLEAR_USER_CREDENTIALS', () => {
    const action = {
      type: actions.CLEAR_USER_CREDENTIALS,
    };
    const state = {
      ...initialState,
      token: 'token',
      username: 'username',
      snippets: {},
    };
    expect(reducer(state, action)).toEqual(initialState);
  });

  it('handles SAVE_USERNAME', () => {
    const username = 'username';
    const action = {
      type: actions.SAVE_USERNAME,
      payload: username,
    };
    const expected = {
      username,
    };
    expect(reducer({}, action)).toEqual(expected);
  });

  it('handles SET_AVATAR_URL', () => {
    const url = 'https://foobar.com/quxbaz';
    const action = {
      type: actions.SET_AVATAR_URL,
      payload: url,
    };
    const expected = { avatarURL: url };
    expect(reducer({}, action)).toEqual(expected);
  });

  it('handles SAVE_ACCESS_TOKEN', () => {
    const token = 'token';
    const action = {
      type: actions.SAVE_ACCESS_TOKEN,
      payload: token,
    };
    const expected = {
      token,
    };
    expect(reducer({}, action)).toEqual(expected);
  });

  it('handles CLEAR_USER_CREDENTIALS', () => {
    const action = {
      type: actions.CLEAR_USER_CREDENTIALS,
    };
    const state = {
      ...initialState,
      token: 'token',
      username: 'username',
      snippets: {},
    };
    expect(reducer(state, action)).toEqual(initialState);
  });

  it('should handle ADD_ORG', () => {
    const org = 'galactic-federation';
    const action = {
      type: actions.ADD_ORG,
      payload: org,
    };
    expect(reducer(undefined, action).orgs).toEqual(expect.arrayContaining([org]));
  });

  describe('SWITCH_ORG', () => {
    const state = {};
    const validOrg = 'galactic-federation';
    const invalidOrg = 'international-counsel-of-ricks';
    beforeEach(() => {
      state.orgs = [validOrg];
      state.selectedOrg = null;
    });
    it('should set the org if the org exists', () => {
      const action = {
        type: actions.SWITCH_ORG,
        payload: validOrg,
      };
      expect(reducer(state, action).selectedOrg).toEqual(validOrg);
    });
    it('shouldn\'t set the org if the org doesn\'t exists', () => {
      const action = {
        type: actions.SWITCH_ORG,
        payload: invalidOrg,
      };
      expect(reducer(state, action).selectedOrg).toBe(null);
    });
  });

  it('should handle SET_USER_SNIPPETS', () => {
    const userSnippets = {
      test_snippet_1: {
        snippetName: 'Test Snippet 1',
        language: 'Python 3',
        lastEdited: '2017-04-05T12:52:20.099Z',
      },
      test_snippet_2: {
        snippetName: 'Test Snippet 2',
        language: 'Python 3',
        lastEdited: '2017-04-05T12:52:20.099Z',
      },
    };
    const action = {
      type: actions.SET_USER_SNIPPETS,
      payload: userSnippets,
    };
    const expected = { userSnippets };
    expect(reducer(undefined, action)).toEqual(expect.objectContaining(expected));
  });
});
