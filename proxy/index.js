const http = require('http');

http.createServer(async (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/plain',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'X-Requested-With'
  });
  const apiUrl = `https://api.deezer.com${req.url}`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.end(JSON.stringify(data));
  } catch (error) {
    res.end('an error occurred');
  }
}).listen(3000);