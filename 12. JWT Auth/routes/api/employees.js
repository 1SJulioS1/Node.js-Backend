const express = require("express");
const router = express.Router();
const employeesController = require("../../controllers/employeesControlers");
//const verifyJWT = require("../../middleware/verifyJWT");
const data = {};

router
  .route("/")
  //14) A way to protect routes
  //.get(verifyJWT, employeesController.getAllEmployees)
  // The other is to protect all routes in server.js
  .get(employeesController.getAllEmployees)
  .post(employeesController.createEmployee)
  .put(employeesController.updateEmployee)
  .delete(employeesController.deleteEmployee);

router.route("/:id").get(employeesController.getEmployee);

module.exports = router;
