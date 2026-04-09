const http = require('http');
const data = JSON.stringify({ name: 'kk', email: 'kkadmin@gmail.com', password: '123456', role: 'admin' });

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/auth/register',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data),
  },
};

const req = http.request(options, (res) => {
  console.log('status', res.statusCode);
  let body = '';
  res.on('data', (chunk) => { body += chunk; });
  res.on('end', () => { console.log('body', body); });
});

req.on('error', (e) => {
  console.error('request error', e);
});
req.write(data);
req.end();
