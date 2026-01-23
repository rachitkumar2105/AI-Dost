const https = require('https');

const API_KEY = 'AIzaSyDwnAXkx0b2ZF7-P4vJvtYy67_UzME91S4';

function testModel(modelName) {
    const data = JSON.stringify({
        contents: [{ parts: [{ text: "Hello" }] }]
    });

    const options = {
        hostname: 'generativelanguage.googleapis.com',
        path: `/v1beta/models/${modelName}:generateContent?key=${API_KEY}`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length
        }
    };

    console.log(`Testing ${modelName}...`);

    const req = https.request(options, (res) => {
        let body = '';
        res.on('data', (chunk) => body += chunk);
        res.on('end', () => {
            console.log(`${modelName} Status: ${res.statusCode}`);
            if (res.statusCode !== 200) {
                console.log(`${modelName} Error: ${body}`);
            } else {
                console.log(`${modelName} Success!`);
            }
        });
    });

    req.on('error', (e) => {
        console.error(`${modelName} Request Error: ${e.message}`);
    });

    req.write(data);
    req.end();
}

testModel('gemini-1.5-flash');
testModel('gemini-2.0-flash');
