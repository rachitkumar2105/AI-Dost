const https = require('https');

const API_KEY = 'AIzaSyDwnAXkx0b2ZF7-P4vJvtYy67_UzME91S4';

const options = {
    hostname: 'generativelanguage.googleapis.com',
    path: `/v1beta/models?key=${API_KEY}`,
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
};

const req = https.request(options, (res) => {
    let body = '';
    res.on('data', (chunk) => body += chunk);
    res.on('end', () => {
        console.log(`STATUS: ${res.statusCode}`);
        try {
            const data = JSON.parse(body);
            if (data.models) {
                console.log("Available Models:");
                data.models.forEach(m => {
                    if (m.name.includes('gemini')) {
                        console.log(`- ${m.name} (${m.supportedGenerationMethods})`);
                    }
                });
            } else {
                console.log("Body:", body);
            }
        } catch (e) {
            console.log("Error parsing JSON:", e);
            console.log("Body:", body);
        }
    });
});

req.on('error', (e) => {
    console.error(`Request Error: ${e.message}`);
});

req.end();
