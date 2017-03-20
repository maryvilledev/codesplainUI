'use strict';

console.log('Loading function');

const aws = require('aws-sdk');

const s3 = new aws.S3({ apiVersion: '2006-03-01' });


exports.handler = (event, context, callback) => {
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
