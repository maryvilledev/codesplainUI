'use strict';

console.log('Loading function');

const aws = require('aws-sdk');
const s3 = new aws.S3({ apiVersion: '2006-03-01' });
const lambda = new aws.Lambda({
    region: 'us-west-2',
});

// Helper for invoking the callback in handler func
const sendResponse = (callback, statusCode, response) => {
  callback(null, {
    statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    body: `{ "response": "${response}" }`,
  })
}

// Given an apiID, returns the corresponding S3 bucket; or null if none exists
const mapApiIdToBucket = (apiID) => {
  // TODO: Add Other environments to process.env and if statement
  switch(apiID) {
    case process.env.devID: return process.env.devBucket;
    default: return null;
  }
}

// Deletes the object with the given Key from the given Bucket. Returns a Promise.
const deleteFromS3 = (Bucket, Key) => {
  const params = {
    Bucket,
    Key,
  };
  return new Promise((resolve, reject) => {
    s3.deleteObject(params, (err, data) => {
      if (err) reject(err);
      resolve();
    })
  })
}

exports.handler = (event, context, callback) => {
  // Extract some stuff that we need from the request object
  const accessToken = event.headers.Authorization;
  const userID      = event.pathParameters.user_id;

  // Invoke the authorization lambda to ensure the accessToken
  // included in the request matches the userID for the requested
  // resource.
  lambda.invoke({
    FunctionName: 'AuthorizeToken',
    Payload: JSON.stringify({
      accessToken,
      userID,
    }),
  }, (err, data) => {
    // Handle the error if the AuthorizeToken lambda failed
    // to finish properly.
    if (err) {
      console.log(err);
      sendResponse(callback, '500', 'Failed to save snippet.');
    }

    const payload = JSON.parse(data.Payload);
    // If authorization failed, respond with a 400
    if (payload.statusCode === '400') {
      console.log(payload.body);
      sendResponse(callback, '400', payload.body);
    }

    /* ----- Otherwise, delete from S3 ----- */
    const snippetID = event.pathParameters.snippet_id;
    const key       = `${userID}/${snippetID}`;
    const apiID     = event.requestContext.apiId;
    const bucket    = mapApiIdToBucket(apiID);

    // Respond with a 400 is the apiID wasn't mapped to an S3 bucket
    if (bucket === null) {
      const msg = `Unrecognized apiId: ${apiID}`;
      console.error(msg);
      sendResponse(callback, '400', msg);
    }

    // apiID mapped to an S3 bucket, so delete from there
    deleteFromS3(bucket, key)
      .then(() => {
        sendResponse(callback, '200', 'Successfully deleted.');
      })
      .catch(err => {
        const msg = `Error deleting object ${key} from bucket ${bucket}`;
        console.err(msg);
        sendResponse(callback, '500', 'Failed to delete object.');
      });
  });
};
