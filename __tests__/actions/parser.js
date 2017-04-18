import * as actions from '../../src/actions/parser';

describe('Actions: parser', () => {
  describe('LOAD_PARSER', () => {
    it('creates an action to load a parser', () => {
      const language = 'squanchy';
      const expected = {
        type: actions.LOAD_PARSER,
        payload: language,
      };
      expect(actions.loadParser(language)).toEqual(expect.objectContaining(expected));
    });
  });
});
