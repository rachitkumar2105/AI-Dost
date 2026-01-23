const https = require('https');

const data = JSON.stringify({
    messages: [{ role: 'user', content: 'Hello' }]
});

const options = {
    hostname: 'nyumazseosbsmuyynymt.supabase.co',
    path: '/functions/v1/chats',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length,
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im55dW1henNlb3Nic211eXlueW10Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkxNDM5MjAsImV4cCI6MjA4NDcxOTkyMH0.8V3CQIK5537qqByinUYw4YYNpW1yEsCCmnCXGDjl4VM'
    }
};

const req = https.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);

    res.setEncoding('utf8');
    res.on('data', (chunk) => {
        console.log(`BODY: ${chunk}`);
    });
    res.on('end', () => {
        console.log('No more data in response.');
    });
});

req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
});

req.write(data);
req.end();
