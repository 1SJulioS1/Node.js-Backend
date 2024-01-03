const express = require("express");
const router = express.Router();

//19) Create logoutController in controller folder to user logout
const logoutController = require("../../controllers/logoutController");

router.get("/", logoutController.handleLogout);

module.exports = router;
