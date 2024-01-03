const fs = require("fs");
const path = require("path");

//1) To read a large amount of string data in a file
const rs = fs.createReadStream(path.join(__dirname, "files", "lorem.txt"), {
  encoding: "utf8",
});

const ws = fs.createWriteStream(path.join(__dirname, "files", "newLorem.txt"));

//2) listening for the data coming in and writing to newLorem.txt
rs.on("data", (dataChunk) => {
  ws.write(dataChunk);
});

//2.1) Another way to write a large amount of string data
rs.pipe(ws);

//4) to delete the newLorem.txt file after writing
ws.on("close", () => {
  fs.unlink(path.join(__dirname, "files", "newLorem.txt"), (err) => {
    if (err) throw err;
    console.log("Project set to default");
  });
});
