import express from "express";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());


app.get("/", (req, res) => {
  res.send("Hello World! This is a Dockerized Node.js application.");
});

app.get("/api/data", (req, res) => {
  res.json({ message: "This is some sample data from the API." });
});

app.get("/health", (req, res) => {
  res.status(200).send("Container is healthy!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});



/*
    Let us list all the requirements this file has:
    1. Nodejs
    2. npm
    3. express
    

*/