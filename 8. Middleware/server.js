const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const { logEvents, logger } = require(".//middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");

//7) Custom middleware to log all requests
// It's necessary to declare it before 'cause the order of execution
// matters in express.js
app.use(logger);

//8)Cross Origin Resource Sharing
const whiteList = [
  "https://www.yoursite.com",
  "https://127.0.0.1:5500",
  "http://localhost:3500",
  "https://www.google.com/",
];
const corsOptions = {
  origin: (origin, callback) => {
    // if the domain is not in the whitelist
    if (whiteList.indexOf(origin) != -1 || !origin) {
      // the origin will be sent back () the origin is allowed
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

//4) Built-in middleware to handle urlencoded data
// in other words, form data:
// ‘content-type: application/x-www-form-urlencoded’
// Is responsible for parsing these data and adding them to the
// request object (req) under the body property.
app.use(express.urlencoded({ extended: false }));

//5) Built-in middleware to parse incoming requests with JSON payloads
// and is based on body-parser.
app.use(express.json());

//6) Built-in middleware to serve static files and is based on
//serve-static.
app.use(express.static(path.join(__dirname, "/public")));

PORT = process.env.PORT || 3500;

//1) Urls can use regular expressions
app.get(/^\/$|^\/index(.html)?$/, (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/new-page(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "new-page.html"));
});

app.get("/old-page(.html)?", (req, res) => {
  res.redirect(301, "/new-page");
});

//2) Chaining function using next
app.get(
  "/hello(.html)?",
  (req, res, next) => {
    console.log("attempting to load hello.html");
    next();
  },
  (req, res) => {
    res.send("Hello world");
  }
);

//2) chaining route handlers
const one = (req, res, next) => {
  console.log("one");
  next();
};

const two = (req, res, next) => {
  console.log("two");
  next();
};

const three = (req, res) => {
  console.log("three");
  res.send("Finished!");
};

app.get("/chain(.html)?", [one, two, three]);

//3) There are 3 types of middleware:
//      - custom middleware
//      - built-in middleware
//      - third middleware
//

// 10) Everything else is 404
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ errr: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

//9) Middleware to handle errors
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
