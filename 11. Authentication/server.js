const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const { logEvents, logger } = require(".//middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const corsOptions = require("./config/corsOptions");

//1) Create users.json in model folder to simulate user data in database
//2) Create a user route to handle request (registerController.js in controller folder)
//3) Install bcrypt package to handle password management
//4) Create handleNewUser controller to register a new user in registerController.js
//5) Create a route to register a new user in routes/api called register.js
app.use(logger);
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "/public")));

app.use("/", require("./routes/root"));
//6) Use route to register a new user
app.use("/register", require("./routes/api/register"));
//7) Create handleLogin controller to authenticate an user in authController.js
//8) Create a route to authenticate an user in routes/api called auth.js
//9) Use route to authenticate an user
app.use("/auth", require("./routes/api/auth"));
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
