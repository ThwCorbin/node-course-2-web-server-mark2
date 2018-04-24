const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

let app = express();

hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");

app.use((req, res, next) => {
  let now = new Date().toString();
  let log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile("server.log", log + "\n", err => {
    if (err) {
      console.log("Unable to append to server.log.");
    }
  });
  next();
  // req.url - the path the client requested
  // req.method - a string corresponding to the HTTP...
  // ...method of the request: GET, POST, PUT, and so on.
  // "\n" creates newline after each entry
  // next() tells express when middleware function is done...
  // ...to move on to the rest of the request
});

// app.use((req, res, next) => {
//   res.render("maintenance.hbs");
//   // Since we don't call next(), everything stops
//   // ...and /home and /about and public files won't work
// });

app.use(express.static(__dirname + "/public"));

hbs.registerHelper("getCurrentYear", () => {
  return new Date().getFullYear();
});

hbs.registerHelper("screamIt", text => {
  return text.toUpperCase();
});

app.get("/", (req, res) => {
  res.render("home.hbs", {
    pageTitle: "Home Page",
    welcomeMessage: "Welcome Human!"
  });
});

app.get("/about", (req, res) => {
  res.render("about.hbs", {
    pageTitle: "About Page"
  });
});

app.get("/bad", (req, res) => {
  res.send({
    errorMessage: "Unable to provide content."
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
