const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const { logEvents, logger } = require(".//middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const corsOptions = require("./config/corsOptions");
const verifyJWT = require("./middleware/verifyJWT");
const credentials = require("./middleware/credentials");
const cookieParser = require("cookie-parser");

//1) Create a role list in config/roles_list.js
//2) Modify  model/users.json
//3) Modify register controller in controllers/registerController.js
// to add roles when user is created
//5) Add role information inside Access Token
//8) Go to refresh token controller in controller/refreshTokenController.js
// to update add role information in access token update
//10) Update verifyJWT middleware
//14) Create a new middleware to verify roles in middleware folder (called verifyRoles.js)
//16) Modify employees route in routes/api/employees.js to verify roles
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

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
