const fs = require("fs");
const path = require("path");

//1) Creating a new directory
if (!fs.existsSync("./new")) {
  fs.mkdir("./new", (err) => {
    if (err) throw err;
    console.log("Directory creted");
  });
} else {
  console.log("Directory is there already");
}

//2) Removing a directory
fs.rm(path.join(__dirname, "/new"), { recursive: true }, (err) => {
  if (err) {
    console.error("Error deleting directory:", err);
  } else {
    console.log("Project set to default");
  }
});
