const express = require("express");
const router = express.Router();
const employeesController = require("../../controllers/employeesControlers");
//17) Add necessary imports
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");
const data = {};

router
  .route("/")
  .get(employeesController.getAllEmployees)
  .post(
    //Add middleware function to verify roles
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    employeesController.createEmployee
  )
  .put(
    //Add middleware function to verify roles
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    employeesController.updateEmployee
  )
  .delete(verifyRoles(ROLES_LIST.Admin), employeesController.deleteEmployee);

router.route("/:id").get(employeesController.getEmployee);

module.exports = router;
