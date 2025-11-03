import express from "express";

const app = express();

const port = 3000;

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("books.ejs");
});

app.get("/quotes", (req, res) => {
  res.render("quotes.ejs");
});

app.get("/dashboard", (req, res) => {
  res.render("dashboard.ejs");
});

app.get("/add", (req, res) => {
  res.render("addbook.ejs");
});

app.get("/profile", (req, res) => {
  res.render("profile.ejs");
});

app.listen(port, () => {
  console.log("port 3000 checked");
});
