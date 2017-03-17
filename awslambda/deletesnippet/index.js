'use strict';

console.log('Loading function');

const aws = require('aws-sdk');

const s3 = new aws.S3({ apiVersion: '2006-03-01' });


exports.handler = (event, context, callback) => {
    const key = event.pathParameters.user_id + "/" + event.pathParameters.snippet_id;
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
    };
    s3.deleteObject(params, (err, data) => {
        if (err) {
            console.log(err);
            const message = `Error deleteing object ${params.Key} from bucket ${bucket}.`;
            callback(message);
            context.fail({ statusCode: 400});

        } else {
            context.succeed({ statusCode: 200});
        }
    });
};
