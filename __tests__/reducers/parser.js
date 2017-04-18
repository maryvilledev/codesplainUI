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
});
