console.log("Hello World");

//1) global object: provides a global scope for all variables and functions.
console.log(global);

//2) CommonJs modules instead of ES6 modules
const os = require("os");
console.log(os.type());
console.log(os.version());
console.log(os.homedir());

//3) specials variables
console.log(__dirname);
console.log(__filename);

//4) provides utilities for working with file and directory paths.
// It can be accessed using:
const path = require("path");
// returns the directory name of a path
console.log(path.dirname(__filename));
//  returns the last portion of a path
console.log(path.basename(__filename));
//  returns the extension of the path, from the last occurrence
//  of the . (period) character to end of string in the last
// portion of the path. If there is no . in the last portion
// of the path, or if there are no . characters other than the
// first character of the basename of path (see path.basename()) ,
// an empty string is returned.
console.log(path.extname(__filename));
// provides utilities for working with file and directory paths.
const parsedPath = path.parse(filePath);

console.log(parsedPath.root); // Output: /
console.log(parsedPath.dir); // Output: /path/to
console.log(parsedPath.base); // Output: myfile.txt
console.log(parsedPath.ext); // Output: .txt
console.log(parsedPath.name); // Output: myfile
