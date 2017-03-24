import configureMockStore from 'redux-mock-store'

import * as actions from '../../src/actions/parser'

describe('Actions: parser', () => {
  describe('SET_PARSER_STATE', () => {
    it('creates an action to set the parser state', () => {
      const parserState = 'LOADED'
      const expected = {
        type: actions.SET_PARSER_STATE,
        payload: parserState
      };
      expect(actions.setParserState(parserState)).toEqual(expected)
    })
  })
  describe('LOAD_PARSER', () => {
    it('creates an action to load a parser', () => {
      const parser = jest.fn();
      const expected = {
        type: actions.LOAD_PARSER,
        payload: parser
      };
      expect(actions.loadParser(parser)).toEqual(expected)
    })
  })
})
