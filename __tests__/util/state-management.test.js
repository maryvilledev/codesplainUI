import * as utils from '../../src/util/state-management';

describe('util: state-management', () => {
  describe('defaultStateValues', () => {
    it('matches snapshot', () => {
      expect(utils.defaultStateValues).toMatchSnapshot();
    });
  });
  describe('setDefaults', () => {
    it('sets the default state values', () => {
      expect(utils.setDefaults({})).toEqual(utils.defaultStateValues);
    });
    it('does not override pre-existing state properties', () => {
      const snippetLanguage = 'java';
      const state = {
        snippetLanguage,
      };
      expect(utils.setDefaults(state).snippetLanguage).toEqual(snippetLanguage);
    });
  });
});
