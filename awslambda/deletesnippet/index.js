'use strict';

console.log('Loading function');

const aws = require('aws-sdk');

const s3 = new aws.S3({ apiVersion: '2006-03-01' });


exports.handler = (event, context, callback) => {
    console.log(JSON.stringify(event));
    var user_id = event.pathParameters.user_id;
    var snippetKey = event.pathParameters.snippet_id;

    var bucket;

    // TODO: Add Other environments to process.env and if statement
    if (event.requestContext.apiId === process.env.devID) {
        bucket = process.env.devBucket;
    } else {
        console.err("Invalid apiId" + event.requestContext.apiId);
    }

    const params = {
        Bucket: bucket,
        Key: user_id + "/" + snippetKey,
    };
    s3.deleteObject(params, (err, data) => {
        if (err) {
            console.log(err);
            const message = `Error deleteing object ${params.Key} from bucket ${bucket}.`;
            console.log(message);
            callback(message);
            context.Error({ statusCode: 200});

        } else {
            context.succeed({ statusCode: 200});
        }
    });
};
