'use strict';

console.log('Loading function');

const aws = require('aws-sdk');

const s3 = new aws.S3({ apiVersion: '2006-03-01' });

const lambda = new aws.Lambda({
  region: 'us-west-2',
})

// Helper for invoking the callback in handler func
const sendResponse = (callback, statusCode, response) => {
  callback(null, {
    statusCode,
    body: `{ "response": "${response}" }`,
  })
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
  const accessToken = event.headers.Authorization;
  const userID = event.pathParameters.user_id;
  lambda.invoke({
    FunctionName: 'AuthorizeToken',
    Payload: JSON.stringify({
      accessToken,
      userID,
    })
  }, (err, data) => {
    if (err) console.log(err)
    console.log('data:')
    console.log(data)
    const payload = JSON.parse(data.Payload)
    // If authorization failed, respond with a 400
    if (payload.statusCode === '400') {
      console.log(err)
      sendResponse(callback, '400', payload.body)
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
        })
      })
      .catch(err => {
        const message = `Error putting object ${params.Key} into bucket ${bucket}.` +
                        `Make sure they exist and your bucket is in the same ` +
                        `region as this function.`;
        console.log(message);
        sendResponse(callback, '500', 'Error saving snippet.');
      });
  });
};
