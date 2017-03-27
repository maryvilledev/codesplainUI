import * as actions from '../../src/actions/parser'

describe('Actions: parser', () => {
  describe('LOAD_PARSER', () => {
    it('creates an action to load a parser', () => {
      const parserURL = 'https://www.rickandmorty100years.com';
      const expected = {
        type: actions.LOAD_PARSER,
        payload: parserURL
      };
      expect(actions.loadParser(parserURL)).toEqual(expected)
    })
  })
})
