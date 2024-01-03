const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const { logEvents, logger } = require(".//middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");

app.use(logger);

const whiteList = [
  "https://www.yoursite.com",
  "https://127.0.0.1:5500",
  "http://localhost:3500",
  "https://www.google.com/",
];
const corsOptions = {
  origin: (origin, callback) => {
    if (whiteList.indexOf(origin) != -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(express.static(path.join(__dirname, "/public")));

//2) Serving static files for subdir
app.use("/subdir", express.static(path.join(__dirname, "/public")));

//3) Providing a routing for / directory
app.use("/", require("./routes/root"));
//1) Anything request coming from subdir will be handle by subdir.js router
app.use("/subdir", require("./routes/subdir"));
app.use("/employees", require("./routes/api/employees"));

PORT = process.env.PORT || 3500;

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

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
