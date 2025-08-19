
const http = require('node:http')

const server = http.createServer((req, res) => {
  // req = Incoming request object
  // res = Outgoing response object
    console.log(`Method is ${req.method}`)

  res.writeHead(200);
  res.write("Hello from server!");
  res.end();
  
});

// Start server on port 3000
server.listen(3000, () => {
  console.log("Server running at http://localhost:3000/");
});

