'use strict'

console.log('Loading function')

const aws = require('aws-sdk')
const axios = require('axios')

const httpsOpts = (token) => ({
  headers: {
    'Authorization': `token ${token}`,
  }
})

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
  const opts = httpsOpts(token);
  axios.get('https://api.github.com/', opts)
    .then(() => {
      callback(null, generatePolicy('user', 'Allow', event.methodArn))
    })
    .catch(() => {
      callback('Unauthorized')
    })
}
