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
//1)Installing necessary node packages: dotenv jsonwebtoken cookie-parser
//2) Create  .env file in root directory
//3) Create ACCESS_TOKEN_SECRET and REFRESH_TOKEN_SECRET keys using:
//      - require('crypto').randomBytes(64).toString('hex') in node console
//4) Add .env (only for saved for development and use it in deploy) to .gitignore
//5) Modify authController.js to use JWT

app.use(logger);
//21) Handle options credential check -before CORS!
// and fetch cookies credentials requirement (Created in middleware/credentials.js)
app.use(credentials);
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//16) Adding middleware to save refresh tokens in cookies, next create
//refreshTokenController.js
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "/public")));

app.use("/", require("./routes/root"));
app.use("/register", require("./routes/api/register"));
app.use("/auth", require("./routes/api/auth"));
//16) Create a route to update access token using refresh token using routes/api/refresh.js
// after access token has expire
app.use("/refresh", require("./routes/api/refresh"));

//18) Create a route to logout that exist in routes/api/logout.js
app.use("/logout", require("./routes/api/logout"));

//15) Using verifyJWT to check the credential. From this line all routes
// will verify JWT credentials
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
