const https = require('https');
const fs = require('fs');

const API_KEY = 'AIzaSyDwnAXkx0b2ZF7-P4vJvtYy67_UzME91S4';

const options = {
    hostname: 'generativelanguage.googleapis.com',
    path: `/v1beta/models?key=${API_KEY}`,
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
};

const req = https.request(options, (res) => {
    let body = '';
    res.on('data', chunk => body += chunk);
    res.on('end', () => {
        fs.writeFileSync('models.json', body);
        console.log('Saved models.json');
    });
});

req.end();
