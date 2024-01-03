const userDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const fsPromises = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;
  console.log(user, pwd);
  if (!user || !pwd) {
    return res
      .status(400)
      .json({ message: "Username and password must be provided" });
  }
  const duplicate = userDB.users.find((person) => person.username === user);
  if (duplicate) return res.sendStatus(409);
  try {
    const hashedPwd = await bcrypt.hash(pwd, 10);
    const newUser = {
      username: user,
      //14 Add this line. Role code must match with the user role code in config/roles_list.js
      roles: { User: 2001 },
      //
      password: hashedPwd,
    };
    userDB.setUsers([...userDB.users, newUser]);
    await fsPromises.writeFile(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(userDB.users)
    );
    console.log(userDB.users);
    return res.status(201).json({ message: `New user ${user} created!` });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  handleNewUser,
};
