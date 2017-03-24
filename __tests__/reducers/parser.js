import * as actions from '../../src/actions/parser';
import reducer from '../../src/reducers/parser';

describe('Reducer: Parser', () => {
  it('should have initial state', () => {
    const initial = {
      state: actions.LOADING,
      parser: null
    }
    expect(reducer(undefined, {})).toEqual(initial)
  })

  it('should handle SET_PARSER_STATE', () => {
    const nextState = actions.LOADED;
    const action = {
      type: actions.SET_PARSER_STATE,
      payload: nextState
    };
    const expected = {
      state: actions.LOADED
    };
    expect(reducer(undefined, action)).toEqual(expect.objectContaining(expected))
  })

  it('should handle LOAD_PARSER', () => {
    const parser = jest.fn()
    const action = {
      type: actions.LOAD_PARSER,
      payload: parser
    };
    const expected = {
      parser: parser
    };
    expect(reducer(undefined, action)).toEqual(expect.objectContaining(expected))
  })
})
