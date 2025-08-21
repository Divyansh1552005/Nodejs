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
  console.log(`requests coming at ${new Date().toLocaleString("en-IN")}`);

  switch (req.method) {
    case "GET":
      switch (req.url) {
        case "/":
          res.writeHead(200);
          file.appendFile(
            "log.txt",
            `Request: GET | Route: / | Time: ${new Date().toLocaleString(
              "en-IN"
            )}\n`,
            (err) => {
              if (err) throw err;
            }
          );
          return res.end("Hello bruh. This is the root ie / directory");
        case "/contact-us":
          res.writeHead(200);
          file.appendFile(
            "log.txt",
            `Request: GET | Route: /contact-us | Time: ${new Date().toLocaleString(
              "en-IN"
            )}\n`,
            (err) => {
              if (err) throw err;
            }
          );
          return res.end(
            "My name is Divyansh and my email is officialdslc1552005@gmail.com"
          );
        case "/tweet":
          res.writeHead(200, { "Content-Type": "text/plain" });
          file.appendFile(
            "log.txt",
            `Request: GET | Route: /tweet | Time: ${new Date().toLocaleString(
              "en-IN"
            )}\n`,
            (err) => {
              if (err) throw err;
            }
          );
          return res.end(
            `All the tweets are:\n${tweet_obj
              .map(({ title, body }) => `${title} - ${body}`)
              .join("\n")}`
          );
        default:
          res.writeHead(404);
          file.appendFile(
            "log.txt",
            `Request: GET | Route: ${
              req.url
            } | Time: ${new Date().toLocaleString("en-IN")}\n`,
            (err) => {
              if (err) throw err;
            }
          );
          return res.end("404 Not Found");
      }
    case "POST":
      switch (req.url) {
        case "/tweet":
          res.writeHead(201, { "Content-Type": "text/plain" });
          file.appendFile(
            "log.txt",
            `Request: POST | Route: /tweet | Time: ${new Date().toLocaleString(
              "en-IN"
            )}\n`,
            (err) => {
              if (err) throw err;
            }
          );
          res.write("Saving to Database \n");
          setTimeout(() => {
            return res.end("Tweet created successfully");
          }, 1000);
          break;
        default:
          res.writeHead(404);
          file.appendFile(
            "log.txt",
            `Request: POST | Route: ${
              req.url
            } | Time: ${new Date().toLocaleString("en-IN")}\n`,
            (err) => {
              if (err) throw err;
            }
          );
          return res.end("404 Not Found");
      }
      break;
    default:
      res.writeHead(405);
      file.appendFile(
        "log.txt",
        `Request: ${req.method} | Route: ${
          req.url
        } | Time: ${new Date().toLocaleString("en-IN")}\n`,
        (err) => {
          if (err) throw err;
        }
      );
      return res.end("405 Method Not Allowed");
  }
});

server.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
