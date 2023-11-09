const fs = require('fs').promises;
const http = require('http');
const https = require('https');


const fetchJoke = () => {
    return new Promise((resolve, reject) => {
        https.get('https://api.chucknorris.io/jokes/random', (response) => {
            let data = '';

            response.on('data', (chunk) => {
                data += chunk;
            });

            response.on('end', () => {
                const joke = JSON.parse(data).value;
                resolve(joke);
            });
        }).on('error', (error) => {
            reject(error);
        });
    });
};

module.exports = fetchJoke;