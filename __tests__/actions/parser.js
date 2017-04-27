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
  describe('ADD_ERROR', () => {
    it('creates an action to add an error', () => {
      const error = {
        type: 'syntaxError',
        begin: 5,
        end: NaN,
        msg: 'blahblahblah',
      };
      const expected = {
        type: actions.ADD_ERROR,
        payload: error,
      };
      expect(actions.addError(error)).toEqual(expected);
    });
    describe('CLEAR_ERRORS', () => {
      it('creates an action to remove all errors from state', () => {
        const expected = {
          type: actions.CLEAR_ERRORS,
        };
        expect(actions.clearErrors()).toEqual(expected);
      });
    });
  });
});
