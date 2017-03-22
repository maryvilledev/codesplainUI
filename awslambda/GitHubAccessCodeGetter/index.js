'use strict'

console.log('Loading GitHubAccessCodeGetter lambda function');

const axios = require('axios');

// Handler Function:
exports.handler = (event, context, callback) => {
    // Parse the request's body
    const bodyObj = JSON.parse(event.body);
    
    // Create config data for axios post
    const url = 'https://github.com/login/oauth/access_token';
    const data = {
      client_id:     process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      code:          bodyObj.code,
    };
    const config = {
      headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
      },
    };
    
    // Send request to GitHub with the code from the request body
    axios.post(url, data, config)
        .then(response => {
            // Success
            console.log(`Success getting access token from GitHub!`);
            const token = response.data.access_token; // Access token is in the response
            callback(null, {
                statusCode: '200',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify({ token }),
            });
        })
        .catch(err => {
            // Failure
            console.log(`Error getting access token from GitHub: ${JSON.stringify(err)}`);
            callback(null, { 
                statusCode: '400',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
                body: 'The authorization code is invalid', 
            });
        });
};
