'use strict'

console.log('Loading function')

const aws = require('aws-sdk')
const axios = require('axios')
const _ = require('lodash')

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

function generatePolicy(principalId, effect, resource)
{
  return {
    principalId,
    policyDocument: {
      Version: '2012-10-17',
      Statement: [{
        Action: 'execute-api:Invoke',
        Effect: effect,
        Resource: resource
      }]
    }
  };
}

exports.handler = (event, context, callback) => {
  const token = event.authorizationToken;
  const url = authUrl(token);
  const opts = authOpts;
  axios.get(url, opts)
    .then(() => {
      const url = orgUrl;
      const opts = orgOpts(token);
      axios.get(url, opts)
        .then((res) => {
          //Get a list of orgs they are a part of
          const orgs = res.data.map((org) => org.login)
          if (isMemberOfWhitelistedOrg(orgs, orgWhitelist)) {
            callback(null, generatePolicy('user', 'Allow', event.methodArn))
          } else {
            callback('Unauthorized')
          }
        })
        .catch(() => {
          callback('Unauthorized')
        })
    })
    .catch(() => {
      callback('Unauthorized')
    })
}
