const API_URL = process.env.REACT_APP_API_URL;

// encodeURIComponent does not convert all URI-unfriendly characters, necessitating
// and enhanced encoding function
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent#Return_value
export const sanitizeKey = (str) => {
  const getCharCode = ch => `%${ch.charCodeAt(0).toString(16).toUpperCase()}`;
  return encodeURIComponent(str).replace(/[!'()*]/g, ch => getCharCode(ch));
};

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
