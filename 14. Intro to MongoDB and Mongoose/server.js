const express = require("express");
//4) Add this requirement
require("dotenv").config();
const app = express();
const path = require("path");
const cors = require("cors");
const { logEvents, logger } = require(".//middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const corsOptions = require("./config/corsOptions");
const verifyJWT = require("./middleware/verifyJWT");
const credentials = require("./middleware/credentials");
//7) Import mongoose
const mongoose = require("mongoose");
//9) Import connection file in config/dbConn.js
const connectDB = require("./config/dbConn");
const cookieParser = require("cookie-parser");
//mongodb username: jjssiilleess
// mongodb password: zBGwY9sL2YkNkMjo
// username: mongotut, password:testing123
//1) Setting up mongodb db connection https://youtu.be/f2EqECiTBL8?t=20407
//2) Add connection string in .env file: https://youtu.be/f2EqECiTBL8?t=20658
//3) Update verifyJWT.js in middleware folder
//4) Update authController.js in controllers folder
//5) Update refreshTokenController.js in controllers folder
//6) Install mongoose package
//8) Create config/dbConn.js to use as MongoDB connector
//10) Connect to MongoDB using this line
connectDB();

app.use(logger);
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "/public")));

app.use("/", require("./routes/root"));
app.use("/register", require("./routes/api/register"));
app.use("/auth", require("./routes/api/auth"));
app.use("/refresh", require("./routes/api/refresh"));
app.use("/logout", require("./routes/api/logout"));

app.use(verifyJWT);
app.use("/employees", require("./routes/api/employees"));

PORT = process.env.PORT || 3500;

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ err: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);
//11) When connection with database is established for the first time
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
