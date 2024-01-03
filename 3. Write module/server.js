const fs = require("fs");
const path = require("path");
const fsPromises = require("fs").promises;

//1) readFile function
fs.readFile("./files/starter.txt", (err, data) => {
  if (err) throw err;
  // data is presented in buffer data
  console.log(data);
  // data is presented in string
  console.log(data.toString());
});

// defining encoding
fs.readFile(
  path.join(__dirname, "files", "starter.txt"),
  "utf8",
  (err, data) => {
    if (err) throw err;
    console.log(data);
  }
);

console.log("Hello...");

/* ############################################################# */
//2) writeFile function
fs.writeFile(
  path.join(__dirname, "files", "reply.txt"), // file to write to
  "Nice to meet you.", // content
  (err) => {
    if (err) throw err;
    console.log("Write completed successfully");
  }
);

/* ############################################################# */
//3) appendFile function
fs.appendFile(
  path.join(__dirname, "files", "reply.txt"), // file to write to, if it doesn't exist will be created
  "Yeah", // content
  (err) => {
    if (err) throw err;
    console.log("append completed successfully");
  }
);

/* ############################################################# */
//4) rename function
/* fs.rename(
  path.join(__dirname, "files", "reply.txt"), // file to write to, if it doesn't exist will be created
  path.join(__dirname, "files", "new_reply.txt"), // file to write to, if it doesn't exist will be created
  (err) => {
    if (err) throw err;
    console.log("rename completed successfully");
  }
); */

/* ############################################################# */
const fileOps = async () => {
  try {
    const data = await fsPromises.readFile(
      path.join(__dirname, "files", "starter.txt"),
      "utf8"
    );
    console.log(data);
    await fsPromises.writeFile(
      path.join(__dirname, "files", "promiseWrite.txt"),
      data
    );
    await fsPromises.appendFile(
      path.join(__dirname, "files", "promiseWrite.txt"),
      "\n\nNice to meet you"
    );
    const newData = await fsPromises.readFile(
      path.join(__dirname, "files", "promiseWrite.txt"),
      "utf8"
    );
    console.log(newData);
    // Delete method call
    await fsPromises.unlink(path.join(__dirname, "files", "promiseWrite.txt"));
  } catch (err) {
    console.error(err);
  }
};

fileOps();
fs.unlink(path.join(__dirname, "files", "reply.txt"), (err) => {
  if (err) throw err;
  console.log("Project restore to default");
});

// it is necessary to add this code to handle uncaught errors
// exit on uncaught errors
process.on("uncaughtException", (err) => {
  console.error(`There was an uncaught error ${err}`);
  process.exit(1);
});
