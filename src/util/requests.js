const API_URL = process.env.REACT_APP_API_URL;

export const sanitizeKey = str => (
  encodeURIComponent(str)
    .replace(/[!'()*]/g, ch => `%${ch.charCodeAt(0).toString(16)}`)
);

/* Construct the endpoint to make a REST request to. Only the username is
 * field is required; the snippetId will be left blank for POST requests,
 * and can be supplied when needed (say, for PUT requests).
 */
export const makeSaveEndpointUrl = (username, snippetId = '') => {
  if (snippetId) {
    // Return a URL for GET & PUT requests
    return `${API_URL}/users/${username}/snippets/${sanitizeKey(snippetId)}`;
  }
  // Return a URL for POST requests
  return `${API_URL}/users/${username}/snippets`;
};

/*
Construct the REST endpoint for obtaining the parser for the specified
language.
*/
export const makeParserEndpointUrl = language =>
  `${API_URL}/parsers/${language}`;
