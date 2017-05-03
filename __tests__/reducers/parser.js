import * as actions from '../../src/actions/parser';
import reducer from '../../src/reducers/parser';

describe('Reducer: Parser', () => {
  it('should have initial state', () => {
    expect(reducer(undefined, {})).toMatchSnapshot();
  });

  it('should handle LOAD_PARSER', () => {
    const language = 'squanchy';
    const action = {
      type: actions.LOAD_PARSER,
      payload: language,
    };
    const expected = {
      language,
    };
    expect(reducer(undefined, action)).toEqual(expect.objectContaining(expected));
  });

  it('should handle ADD_ERROR', () => {
    const error = {
      type: 'syntaxError',
      begin: 5,
      end: NaN,
      msg: 'blahblahblah',
    };
    const action = {
      type: actions.ADD_ERROR,
      payload: error,
    };
    const expected = { errors: [error] };
    expect(reducer(undefined, action)).toEqual(expect.objectContaining(expected));
  });

  it('should handle CLEAR_ERRORS', () => {
    const error = null;
    const action = {
      type: actions.CLEAR_ERRORS,
      payload: error,
    };
    const expected = { errors: [] };
    expect(reducer(undefined, action)).toEqual(expect.objectContaining(expected));
  });
});
