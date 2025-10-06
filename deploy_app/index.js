import express from "express";
import dotenv from "dotenv/config";

const app = express();


app.get("/", (req, res) => {
  res.send("<h1>Hello, World!<h1>");
});

app.get("/twitter", (req,res) =>{
    res.redirect("https://twitter.com/divyansh1552005");
})

app.get("/github", (req,res) =>{
    res.redirect("https://github.com/divyansh1552005");
})

app.get("/portfolio", (req,res) =>{
    res.redirect("https://divyanshsharma.site");
})


const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
    console.log("Application running on port " + PORT);
})

