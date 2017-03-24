'use strict';

console.log('Loading function');

const aws = require('aws-sdk');
const axios = require('axios');

const s3 = new aws.S3({ apiVersion: '2006-03-01' });

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
Saves the given Body to the given Bucket under the given Key. Returns a Promise.
*/
const saveToS3 = (Bucket, Key, Body) => {
  const params = {
      Bucket,
      Key,
      Body,
  };
  return new Promise((resolve, reject) => {
    s3.putObject(params, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve({ Key });
    });
  });
}

exports.handler = (event, context, callback) => {
  const token = event.headers.Authorization;
  const userID = event.pathParameters.user_id;
  authorizeToken(token, userID)
    .then(isAuthorized => {
      // Reject if not authorized
      if(!isAuthorized) {
        console.log(`${userID} cannot POST to this path!`);
        callback(null, {
          statusCode: '400',
          body: `{ "message": "Not authorized to POST to this path" }`,
        });
        return;
      }

      // Otherwise, save to S3
      let body = JSON.parse(event.body);
      let snippetKey = body.snippetTitle;
      
      snippetKey = snippetKey.replace(/\s+/g, '_').toLowerCase();
      const key = event.pathParameters.user_id + "/" + snippetKey;
      let bucket;
      
      // TODO: Add Other environments to process.env and if statement
      if (event.requestContext.apiId === process.env.devID) {
          bucket = process.env.devBucket;
      } else {
          console.err("Invalid apiId" + event.requestContext.apiId);
      }

      saveToS3(bucket, key, event.body)
        .then(key => {
          callback(null, {
            statusCode: '200',
            body: JSON.stringify(key),
          });
        })
        .catch(err => {
          const message = `Error putting object ${params.Key} into bucket ${bucket}.` +
                          `Make sure they exist and your bucket is in the same ` +
                          `region as this function.`;
          console.log(message);
          callback(null, {
            statusCode: '500',
            body: JSON.stringify(err),
          })
        })
    })
    .catch(err => {
      callback(null, {
        statuCode: '500',
        body: JSON.stringify(err),
      })
    })
};
