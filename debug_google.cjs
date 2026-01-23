const https = require('https');

const API_KEY = 'AIzaSyDwnAXkx0b2ZF7-P4vJvtYy67_UzME91S4';
const MODEL = 'gemini-2.0-flash';

const data = JSON.stringify({
    contents: [{ parts: [{ text: "Hello" }] }]
});

const options = {
    hostname: 'generativelanguage.googleapis.com',
    path: `/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
};

const req = https.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    res.on('data', d => process.stdout.write(d));
});

req.on('error', e => console.error(e));
req.write(data);
req.end();
