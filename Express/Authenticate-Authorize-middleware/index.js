// index.js
const express = require("express");
const app = express();
const port = 3000;

// Fake "users" database (for demo only!)
const users = {
  alice: { role: "user" },
  mukesh: { role: "user" },
  bob: { role: "admin" }
};

// Middleware: Check if logged in
function checkAuth(req, res, next) {
  const username = req.query.user; // pretend user logs in via ?user=alice

  if (!username || !users[username]) {
    return res.status(403).send("Not Logged In (Forbidden)");
  }

  // attach user info to request
  req.user = users[username];
  next();
}

// Middleware: Check if user is admin
function checkAdmin(req, res, next) {
  if (req.user.role !== "admin") {
    return res.status(401).send("You are not authorized");
  }
  next();
}

// Routes
app.get("/", (req, res) => {
  res.send("Welcome! Try /admin?user=alice or /admin?user=bob");
});

app.get("/profile", checkAuth, (req, res) => {
  res.send(`Welcome ${req.user.role}!`);
});
app.get("/admin", checkAuth, checkAdmin, (req, res) => {
  res.send("Welcome Admins!");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});