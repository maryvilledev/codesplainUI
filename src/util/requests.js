const API_URL = process.env.REACT_APP_API_URL;

/* Construct the endpoint to make a REST request to. Only the username is
 * field is required; the snippetId will be left blank for POST requests,
 * and can be supplied when needed (say, for PUT requests).
 *
 */
export const makeSaveEndpointUrl = (username, snippetId = '') => {
  if (snippetId) {
    return `${API_URL}/users/${username}/snippets/${snippetId}`;
  }
  return `${API_URL}/users/${username}/snippets`;
}
