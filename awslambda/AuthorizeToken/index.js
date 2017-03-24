'use strict';

console.log('Loading AuthorizeToken lambda function');

const axios = require('axios');

// Helper for invoking the callback in handler func
const sendResponse = (callback, statusCode, response) => {
  callback(null, {
    statusCode,
    body: response,
  })
}

/*
Given a GitHub access token, authorizeToken gets the basic profile info for the 
user and returns true if username contained therein matches the given username.
(Return value is in form of a Promise)
*/
const authorizeToken = (accessToken, username) => {
  const headers = {
    Accept: 'application/json',
    Authorization: `token ${accessToken}`,
  };
  return new Promise((resolve, reject) => {
    axios.get(`https://api.github.com/user`, { headers })
    .then(res => {
      const doesMatch = res.data.login === username;
      resolve(doesMatch);
    }, err => {
      reject(err);
    });
  });
}

/*
event object should be of the following form:
{
  accessToken: <GitHub-access-token>,
  userID: <{user_id} variable of resource>
}
*/
exports.handler = (event, context, callback) => {
  console.log('event:')
  console.log(event)
  authorizeToken(event.accessToken, event.userID)
    .then(isAuthorized => {
      // Reject if not authorized
      if(!isAuthorized) {
        console.log(`accessToken does not match with userID`);
        sendResponse(callback, '400', 'Not authorized to access this resource');
      }

      // Otherwise confirm authorization
      sendResponse(callback, '200', 'Authorized to access this resource')
    })
    .catch(err => {
      sendResponse(callback, '500', JSON.stringify(err));
    })
};
