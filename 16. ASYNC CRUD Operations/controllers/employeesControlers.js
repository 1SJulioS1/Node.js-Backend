//Remove this import
/* const data = {
  employees: require("../model/employees.json"),
  setEmployees: function (data) {
    this.employees = data;
  },
}; */

// Add this import
const Employee = require("../model/employee");

const getAllEmployees = async (req, res) => {
  // Remove this line
  //res.json(data.employees);
  const employees = await Employee.find();
  if (!employees) return res.status(404).json({ message: "No employee found" });
  res.json(employees);
};

const createEmployee = async (req, res) => {
  //Remove this
  /* const newEmployee = {
    id: data.employees?.length
      ? data.employees[data.employees.length - 1].id + 1
      : 1,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  }; */
  if (!req?.body?.firstname || !req?.body?.lastname) {
    return res
      .status(400)
      .json({ message: "First and last name are required" });
  }
  try {
    const result = await Employee.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    });
    return res.status(201).json(result);
  } catch (err) {
    console.error(err);
  }
  // Remove this
  /* 
  if (!newEmployee.firstname || !newEmployee.lastname) {
    return res
      .status(400)
      .json({ message: "First and last names are required." });
  

  data.setEmployees([...data.employees, newEmployee]);
  res.status(201).json(data.employees);} 
  */
};

const updateEmployee = async (req, res) => {
  // Delete this
  /*  const employee = data.employees.find(
    (emp) => emp.id === parseInt(req.body.id)
  ); */
  if (!req?.body?.id) {
    return res.status(400).json({ message: "Id parameter is required" });
  }
  //Add this
  const employee = await Employee.findOne({ _id: req.body.id }).exec();
  if (!employee) {
    return res
      .status(204)
      .json({ message: `No employee matches ID ${req.body.id}.` });
  }
  if (req.body?.firstname) employee.firstname = req.body.firstname;
  if (req.body?.lastname) employee.lastname = req.body.lastname;
  //Remove this
  /* const filteredArray = data.employees.filter(
    (emp) => emp.id !== parseInt(req.body.id)
  );
  const unsortedArray = [...filteredArray, employee];
  data.setEmployees(
    unsortedArray.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
  ); */
  //Add this
  const result = await employee.save();
  res.json(result);
};

const deleteEmployee = async (req, res) => {
  //Add this
  if (!req?.body?.id) {
    return res.status(400).json({ message: "Id parameter is required" });
  }
  // Remove this
  /* const employee = data.employees.find(
    (emp) => emp.id === parseInt(req.body.id)
  ); */
  //Add this
  const employee = await Employee.findOne({ _id: req.body.id }).exec();

  if (!employee) {
    return res
      .status(400)
      .json({ message: `Employee ID ${req.body.id} not found` });
  }
  //Remove this
  /*  const filteredArray = data.employees.filter(
    (emp) => emp.id !== parseInt(req.body.id)
  );
  data.setEmployees([...filteredArray]); */
  const result = await employee.deleteOne({ _id: req.body.id });
  res.json(result);
};

const getEmployee = async (req, res) => {
  //Add this
  if (!req?.params?.id) {
    return res.status(400).json({ message: "Id parameter is required" });
  }
  // Remove this
  /* const employee = data.employees.find(
    (emp) => emp.id === parseInt(req.body.id)
  ); */
  //Add this
  const employee = await Employee.findOne({ _id: req.params.id }).exec();

  if (!employee) {
    return res
      .status(400)
      .json({ message: `Employee ID ${req.body.id} not found` });
  }

  res.json(employee);
};

module.exports = {
  getAllEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
};
