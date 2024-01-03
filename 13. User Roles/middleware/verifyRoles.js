//15) Implementation
// Pass how many roles as needed using ...allowedRoles
const verifyRoles = (...allowedRoles) => {
  // Get roles using req.roles
  return (req, res, next) => {
    if (!req?.roles) return res.sendStatus(401);
    const rolesArray = [...allowedRoles];

    const result = req.roles
      // Creates an boolean array to see the roles in the request vs allowd Roles
      // Example
      // in the allowed roles [  5150 (Admin),   1984(Editor)]
      // in the req.roles [5110]
      // map function result: [true, false]
      .map((role) => rolesArray.includes(role))
      // find the first true value to validate user role (in case of
      // false means that the current user isn't authorized
      .find((val) => val === true);
    // In case of false authorization
    if (!result) return res.sendStatus(401);
    // In case of true authorization
    next();
  };
};

module.exports = verifyRoles;
