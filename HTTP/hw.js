const http = require("node:http");
const file = require("node:fs");

const tweet_obj = [
  {
    title: "Hey its me learning Nodejs http module",
    body: "Hey boizz",
  },
  { title: "Second Tweet", body: "Learning map() bruh" },
  { title: "Third Tweet", body: "Still grinding 🚀" },
];

const server = http.createServer((req, res) => {
  const log = {
    method: req.method,
    url: req.url,
    time: new Date().toLocaleString("en-IN"),
  };
  
  function logRequest() {
    file.appendFile(
      "log.txt",
      `Request: ${log.method} | Route: ${log.url} | Time: ${log.time}\n`,
      (err) => {
        if (err) throw err;
      }
    );
  }
  logRequest();
  console.log(`requests coming at ${log.time}`);

  switch (req.method) {
    case "GET":
      switch (req.url) {
        case "/":
          res.writeHead(200);
          return res.end("Hello bruh. This is the root ie / directory");
        case "/contact-us":
          res.writeHead(200);
          return res.end(
            "My name is Divyansh and my email is officialdslc1552005@gmail.com"
          );
        case "/tweet":
          res.writeHead(200, { "Content-Type": "text/plain" });
          return res.end(
            `All the tweets are:\n${tweet_obj
              .map(({ title, body }) => `${title} - ${body}`)
              .join("\n")}`
          );
        default:
          res.writeHead(404);
          return res.end("404 Not Found");
      }
    case "POST":
      switch (req.url) {
        case "/tweet":
          res.writeHead(201, { "Content-Type": "text/plain" });
          res.write("Saving to Database \n");
          setTimeout(() => {
            return res.end("Tweet created successfully");
          }, 1000);
          break;
        default:
          res.writeHead(404);
          return res.end("404 Not Found");
      }
      break;
    default:
      res.writeHead(405);
      return res.end("405 Method Not Allowed");
  }
});

server.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
