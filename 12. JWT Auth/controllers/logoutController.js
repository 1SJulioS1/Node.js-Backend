const userDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};
const fsPromises = require("fs").promises;
const path = require("path");

//20) Implementation
const handleLogout = async (req, res) => {
  //On client, also delete the accessToken

  //Get cookies (refresh token) from request
  const cookies = req.cookies;

  //Check if cookies exist
  if (!cookies?.jwt) return res.sendStatus(204); //No content
  const refreshToken = cookies.jwt;
  //Is refreshToken in db?
  const foundUser = userDB.users.find(
    (person) => person.refreshToken === refreshToken
  );

  // if user is not found and cookie exist
  if (!foundUser) {
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });
    return res.sendStatus(204);
  }
  // Delete the refresh token in db
  const otherUsers = userDB.users.filter(
    (person) => person.refreshToken !== foundUser.refreshToken
  );

  const currentUser = { ...foundUser, refreshToken: "" };
  userDB.setUsers([...otherUsers, currentUser]);
  await fsPromises.writeFile(
    path.join(__dirname, "..", "model", "users.json"),
    JSON.stringify(userDB.users)
  );
  console.log("here");
  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });
  return res.sendStatus(204);
};

module.exports = { handleLogout };
