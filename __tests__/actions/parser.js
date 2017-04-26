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
  describe('SET_ERROR', () => {
    it('creates an action to set an error', () => {
      const error = {
        type: 'syntaxError',
        begin: 5,
        end: NaN,
        msg: 'blahblahblah',
      };
      const expected = {
        type: actions.SET_ERROR,
        payload: error,
      };
      expect(actions.setError(error)).toEqual(expected);
    });
    describe('SET_NO_ERROR', () => {
      it('creates an action to remove errors from state', () => {
        const expected = {
          type: actions.SET_NO_ERROR,
        };
        expect(actions.setNoError()).toEqual(expected);
      });
    });
  });
});
