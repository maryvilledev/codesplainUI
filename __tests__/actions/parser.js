import * as actions from '../../src/actions/parser';

describe('Actions: parser', () => {
  describe('LOAD_PARSER', () => {
    it('creates an action to load a parser', () => {
      const language = 'squanchy';
      expect(actions.loadParser(language)).toMatchSnapshot();
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
      expect(actions.addError(error)).toMatchSnapshot();
    });
    describe('CLEAR_ERRORS', () => {
      it('creates an action to remove all errors from state', () => {
        expect(actions.clearErrors()).toMatchSnapshot();
      });
    });
  });
});
