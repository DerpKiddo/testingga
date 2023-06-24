const net = require('net');

// Proxy configuration
const PROXY_IP = '185.199.229.156';
const PROXY_PORT = 7492;

// Google server details
const GOOGLE_HOST = 'www.google.com';
const GOOGLE_PORT = 80;

function handleClient(clientSocket) {
  // Create a connection to Google
  const googleSocket = net.createConnection(GOOGLE_PORT, GOOGLE_HOST, () => {
    // Forward the client request to Google
    googleSocket.write(request);
  });

  // Receive the response from Google and send it back to the client
  googleSocket.on('data', (data) => {
    clientSocket.write(data);
  });

  // Close the connections
  clientSocket.on('end', () => {
    googleSocket.end();
  });

  googleSocket.on('end', () => {
    clientSocket.end();
  });
}

function runProxy() {
  const proxyServer = net.createServer((clientSocket) => {
    console.log(`Accepted connection from ${clientSocket.remoteAddress}:${clientSocket.remotePort}`);

    // Receive client request
    clientSocket.on('data', (data) => {
      const request = data;

      // Create a new thread to handle the client request
      handleClient(clientSocket, request);
    });
  });

  proxyServer.listen(PROXY_PORT, PROXY_IP, () => {
    console.log(`Proxy server running on ${PROXY_IP}:${PROXY_PORT}`);
  });
}

runProxy();
