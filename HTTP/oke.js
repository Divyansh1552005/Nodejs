const http = require('node:http');

const server = http.createServer(function (req, res) {
  console.log(`Incomming request at [${Date.now()}]`);
  console.log(req.url);


  switch (req.url) {


    case '/':
      res.writeHead(200);
      return res.end(`Homepage`);

    case '/contact-us':
      res.writeHead(200);
      return res.end(`Contact Me at divyanshsharma.site`);

    case '/about':
      res.writeHead(200);
      return res.end('I am a software engineer');

    case '/skills':
      res.writeHead(200);
      return res.end('My skills include JavaScript, Node.js, and more.');

    case '/projects':
      res.writeHead(200);
      return res.end('Here are my projects');

    default:
      res.writeHead(404);
      return res.end("You're lost");
  }
});

server.listen(3000, () => {
  console.log('Server is listening on port 3000');
});


