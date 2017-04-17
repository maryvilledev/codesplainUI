import * as actions from '../../src/actions/parser';
import reducer from '../../src/reducers/parser';

describe('Reducer: Parser', () => {
  it('should have initial state', () => {
    const initial = {
      parserURL: '',
    };
    expect(reducer(undefined, {})).toEqual(initial);
  });

  it('should handle LOAD_PARSER', () => {
    const parserURL = 'https://www.rickandmorty100years.com';
    const action = {
      type: actions.LOAD_PARSER,
      payload: parserURL,
    };
    const expected = {
      parserURL,
    };
    expect(reducer(undefined, action)).toEqual(expect.objectContaining(expected));
  });
});
