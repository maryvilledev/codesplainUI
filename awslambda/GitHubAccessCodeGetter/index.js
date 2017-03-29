'use strict'

console.log('Loading GitHubAccessCodeGetter lambda function');

const axios = require('axios');
const _ = require('lodash');

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

const authUrl = (token) =>
`https://api.github.com/applications/${clientId}/tokens/${token}`
const authOpts = {
  auth: {
    username: clientId,
    password: clientSecret
  }
}
const orgUrl = `https://api.github.com/user/orgs`
const orgOpts = (token) => ({
  headers: {
    'Authorization': `token ${token}`
  }
})

const orgWhitelist = ['maryvilledev', 'LaunchCodeEducation'];

const isMemberOfWhitelistedOrg = (orgs, whitelist) => (
  _.intersection(orgs, whitelist).length > 0
)

// Handler Function:
exports.handler = (event, context, callback) => {
  // Parse the request's body
  const bodyObj = JSON.parse(event.body);

  // Create config data for axios post
  const url = 'https://github.com/login/oauth/access_token';
  const data = {
    client_id:     process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    code:          bodyObj.code,
  };
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  };

  // Send request to GitHub with the code from the request body
  axios.post(url, data, config)
  .then(response => {
    // Success
    console.log(`Success getting access token from GitHub!`);
    const token = response.data.access_token; // Access token is in the response
    axios.get(orgsURL, orgsOpts(token))
    .then((res) => {
      // Collect orgs by name
      orgs = res.data.map((obj) => obj.login);
      //Verify memvber of at least one whitelisted org
      if(isMemberOfWhitelistedOrg(orgs, orgWhitelist)) {
        callback(null, {
          statusCode: '200',
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
          body: JSON.stringify({ token }),
        });
      } else {
        //Not on the whitelist, revoke the token and return 403
        axios.delete(authUrl(token), authOpts)
        callback(null, {
          statusCode: '403',
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
          body: 'You are not a member of an organization ' +
          'authorized to use this application'
        })
      }
    })
    .catch((err) => {
      //Bad response from Github, cancel the token and 500
      axios.delete(authUrl(token), authOpts)
      callback(null, {
        statusCode: '500',
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        body: 'Bad response from Github'
      })
    })
  })
  .catch(err => {
    // Failure
    console.log(`Error getting access token from GitHub: ${JSON.stringify(err)}`);
    callback(null, {
      statusCode: '400',
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: 'The authorization code is invalid',
    });
  });
};
