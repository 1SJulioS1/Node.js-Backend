//3) Remove this
/*const userDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};*/
//4) Add this line to import User model
const User = require("../model/User");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd) {
    return res
      .status(400)
      .json({ message: "Username and password must be provided" });
  }
  // Updated with database interactions to verify if the user already exists
  // The findOne function uses exec()
  const duplicate = await User.findOne({ username: user }).exec();
  if (duplicate) return res.sendStatus(409);
  try {
    const hashedPwd = await bcrypt.hash(pwd, 10);
    // Creating and store the new User
    const result = await User.create({
      username: user,
      password: hashedPwd,
    });
    console.log(result);

    return res.status(201).json({ message: `New user ${user} created!` });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  handleNewUser,
};
