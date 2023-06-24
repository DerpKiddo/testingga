const http = require('http');

// Proxy configuration
const PROXY_IP = '127.0.0.1';
const PROXY_PORT = 80;

// Google server details
const GOOGLE_HOST = 'www.google.com';

// Create a proxy server
const proxy = http.createServer((req, res) => {
  const options = {
    host: GOOGLE_HOST,
    port: 80,
    path: req.url,
    method: req.method,
    headers: req.headers
  };

  // Make a request to Google using the proxy IP and address
  const proxyReq = http.request(options, (proxyRes) => {
    res.writeHead(proxyRes.statusCode, proxyRes.headers);

    proxyRes.on('data', (chunk) => {
      res.write(chunk);
    });

    proxyRes.on('end', () => {
      res.end();
    });
  });

  req.on('data', (chunk) => {
    proxyReq.write(chunk);
  });

  req.on('end', () => {
    proxyReq.end();
  });
});

// Start the proxy server
proxy.listen(PROXY_PORT, PROXY_IP, () => {
  console.log(`Psadsaroxy server running on ${PROXY_IP}:${PROXY_PORT}`);
});
