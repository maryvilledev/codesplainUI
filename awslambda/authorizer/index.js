'use strict'

console.log('Loading function')

const aws = require('aws-sdk')
const axios = require('axios')

const httpsOpts = (token) => ({
  headers: {
    'Authorization': `token ${token}`,
  }
})

const generatePolicy = (principleId, effect, resource) => {
  let authResponse = {};

  authResponse.principleId = principleId;
  if (effect && resource) {
    const policyDocument = {
      Version: '2012-10-17', //Default Version
      Statement: [{
        Action: 'execute-api:Invoke', //Default Action
        Effect: effect,
        Resource: resource
      }]
    };
    authResponse.policyDocument = policyDocument;
  }
  return authResponse;
}

exports.handler = (event, context, callback) => {
  const token = event.authorizationToken;
  const opts = httpsOpts(token);
  axios.get('https://api.github.com/', opts)
    .then(() => {
      callback(null, generatePolicy('user', 'Allow', event.methodArn))
    })
    .catch(() => {
      callback('Unauthorized')
    })
}
