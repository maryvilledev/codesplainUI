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

// Saves the given Body to the given Bucket under the given Key. Returns a Promise.
const saveToS3 = (Bucket, Key, Body) => {
  const params = {
      Bucket,
      Key,
      Body,
  };
  return new Promise((resolve, reject) => {
    s3.putObject(params, (err, data) => {
      if (err) reject(err);
      resolve({ Key });
    });
  });
}

exports.handler = (event, context, callback) => {
  // Extract some stuff that we need from the request object.
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

    /* ----- Otherwise, save to S3 ----- */
    const body       = JSON.parse(event.body);
    const snippetKey = body.snippetTitle.replace(/\s+/g, '_').toLowerCase();
    const key        = `${userID}/${snippetKey}`;
    const apiID      = event.requestContext.apiId;
    const bucket     = mapApiIdToBucket(apiID);

    // Respond with a 400 if the apiID wasn't mapped to an S3 bucket
    if (bucket === null) {
      const msg = `Unrecognized apiId: ${apiID}`;
      console.err(msg);
      sendResponse(callback, '400', msg);
    }

    // apiID mapped to an S3 bucket, so save to that
    saveToS3(bucket, key, event.body)
      .then(key => {
        callback(null, {
          statusCode: '200',
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
          body: `{ "key": "${snippetKey}" }`,
        })
      })
      .catch(err => {
        const message = `Error putting object ${key} into bucket ${bucket}.` +
                        `Make sure they exist and your bucket is in the same ` +
                        `region as this function.`;
        console.log(message);
        sendResponse(callback, '500', 'Error saving snippet.');
      });
  });
};
