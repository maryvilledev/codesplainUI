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
});
