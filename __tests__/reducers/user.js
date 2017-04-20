import * as actions from '../../src/actions/user';
import reducer, { initialState } from '../../src/reducers/user';

describe('Reducer: User', () => {
  describe('initialState', () => {
    it('should match snapshot', () => {
      expect(reducer(undefined, {})).toMatchSnapshot();
    });
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
      token: 'token',
      username: 'username',
      snippets: {},
    };
    expect(reducer(state, action)).toEqual(initialState);
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
