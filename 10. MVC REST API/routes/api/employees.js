const express = require("express");
const router = express.Router();
const employeesController = require("../../controllers/employeesControlers");
const data = {};

router
  .route("/")
  .get(employeesController.getAllEmployees)
  .post(employeesController.createEmployee)
  .put(employeesController.updateEmployee)
  .delete(employeesController.deleteEmployee);

router.route("/:id").get(employeesController.getEmployee);

module.exports = router;
