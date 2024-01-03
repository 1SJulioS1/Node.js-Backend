const express = require("express");
const router = express.Router();

//17) Create refreshTokenController in controller folder to update access token to update refresh token
const refreshTokenController = require("../../controllers/refreshTokenController");

router.get("/", refreshTokenController.handleRefreshToken);

module.exports = router;
