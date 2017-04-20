import * as reqUtils from '../../src/util/requests';

const API_URL = process.env.REACT_APP_API_URL;

describe('util: requests', () => {
  describe('makeSaveEndpointUrl', () => {
    it('makes a new POST endpoint given a username', () => {
      const username = 'RickSanchez';
      const expected = `${API_URL}/users/${username}/snippets`;
      expect(reqUtils.makeSaveEndpointUrl(username)).toEqual(expected);
    });
    it('makes a new PUT endpoint given a username and snippetId', () => {
      const username = 'RickSanchez';
      const snippet = 'portalGun';
      const expected = `${API_URL}/users/${username}/snippets/${snippet}`;
      expect(reqUtils.makeSaveEndpointUrl(username, snippet)).toEqual(expected);
    });
  });
  describe('sanitizeKey', () => {
    it('encodes characters that encodeURIComponent does not', () => {
      const str = '!()*\'';
      const encoded = reqUtils.sanitizeKey(str);
      // Check that none of the characters in the original string appear in
      // the encoded string
      expect(str.split().every(ch => encoded.indexOf(ch) === -1)).toBe(true);
    });
    it('encodes titles with apostrophes', () => {
      const title = 'rick\'s_recipe_for_concentrated_dark_matter';
      const expected = 'rick%27s_recipe_for_concentrated_dark_matter';
      expect(reqUtils.sanitizeKey(title)).toEqual(expected);
    });
  });
});
