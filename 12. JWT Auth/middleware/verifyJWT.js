const jwt = require("jsonwebtoken");
require("dotenv").config();

//13) Middleware to verify that the user is authenticated using JWT
// it will be use in routes/api/employees
const verifyJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.sendStatus(401);
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403); // Invalid token
    req.user = decoded.username;
    next();
  });
};

module.exports = verifyJWT;
