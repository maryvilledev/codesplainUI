'use strict'

console.log('Loading function')

const aws = require('aws-sdk')
const axios = require('axios')

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

const httpsUrl = (token) =>
  `https://api.github.com/applications/${clientId}/tokens/${token}`
const httpsOpts = {
  auth: {
    username: clientId,
    password: clientSecret
  }
}

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
  const url = httpsUrl(token);
  const opts = httpsOpts;
  return axios.get(url, opts)
    .then(() => {
      callback(null, generatePolicy('user', 'Allow', event.methodArn))
    })
    .catch(() => {
      callback('Unauthorized')
    })
}
