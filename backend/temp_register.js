const http = require('http');
const data = JSON.stringify({ name: 'Test User', email: 'testuser@example.com', password: 'Test1234' });
const opts = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/auth/register',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data),
  },
};

const req = http.request(opts, (res) => {
  console.log('status', res.statusCode);
  let body = '';
  res.on('data', (chunk) => { body += chunk; });
  res.on('end', () => { console.log('body', body); });
});

req.on('error', console.error);
req.write(data);
req.end();
