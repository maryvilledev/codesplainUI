'use strict';

console.log('Loading function');

const aws = require('aws-sdk');
const axios = require('axios');

const s3 = new aws.S3({ apiVersion: '2006-03-01' });

/*
Given a GitHub access token, verifyToken gets the basic profile info for the 
user and returns true if username contained therein matches the given username.
*/
const verifyToken = (accessToken, username) => {
    console.log(`accessToken: ${accessToken}, username: ${username}`);
    const headers = {
            Accept: 'application/json',
            Authorization: `token ${accessToken}`,
        };
    axios.get(`https://api.github.com/user`, { headers })
      .then(res => {
          console.log(res);
          const user = res.data.user;
      }, err => {
          console.log(err);
      });
}


exports.handler = (event, context, callback) => {
    const token = event.authorizationToken;
    verifyToken(token, event.pathParameters.user_id);

    
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

    const params = {
        Bucket: bucket,
        Key: key,
        Body: event.body
    };
    s3.putObject(params, (err, data) => {
        if (err) {
            const message = `Error putting object ${params.Key} into bucket ${bucket}. Make sure they exist and your bucket is in the same region as this function.`;
            console.log(message);
            context.fail({ statusCode: 400});

        } else {
            const object = JSON.stringify({key});
            context.succeed({statusCode: 200, body: object})
        }
    });
};
