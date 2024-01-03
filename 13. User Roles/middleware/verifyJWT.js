const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyJWT = (req, res, next) => {
  //11) Change this line
  const authHeader = req.headers.authorization || req.headers.Authorization;
  //12) Change this line
  if (!authHeader?.startsWith("Bearer")) return res.sendStatus(401);
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403); // Invalid token
    //14) Update this line
    req.user = decoded.UserInfo.username;
    //13) Add this line
    req.roles = decoded.UserInfo.roles;
    next();
  });
};

module.exports = verifyJWT;
