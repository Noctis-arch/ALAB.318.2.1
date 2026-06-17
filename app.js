const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// view engine
app.set("view engine", "ejs");

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use((req, res, next) => {
  console.log(`${req.method} request made to ${req.url}`);
  next();
});

// routes
app.get("/", (req, res) => {
  res.render("index", {
    title: "Home Page",
    message: "Welcome to my Express app"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Page",
    message: "This page uses another EJS view."
  });
});

app.get("/user/:name", (req, res) => {
  res.render("index", {
    title: "User Page",
    message: `Hello, ${req.params.name}!`
  });
});

app.post("/submit", (req, res) => {
  console.log(req.body);
  res.send("Success! Your form was submitted.");
});

app.get("/download", (req, res) => {
  res.download(path.join(__dirname, "public", "dog.png"));
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});