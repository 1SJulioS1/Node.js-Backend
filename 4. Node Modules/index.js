console.log("testing");

//1) Install global npm dependency globally
// npm npm i nodemon -g

//2)  To initialize npm for a project
// npm init

//3) To install all dependencies from a cloned project
//npm install

//4) To install a dependency and save it as a dev dependency
//npm i nodemon --D

const { format } = require("date-fns");

console.log(format(new Date(), "yyyMMdd\tHH:mm:ss"));

//##################################################################
//5) Scripts in package.json
/* default
   "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
    "dev":"nodemon index.js" //added
  },

 To run scripts use node run <script>, for example
npm run dev  
  */

//##################################################################
//6) To add uuid (used to generate Universally Unique Identifier) dependency and
//use it as custom dependency identifier
// npm install uuid

const { v4: uuid } = require("uuid");
console.log(uuid());

//7) To install a specific version of a dependency
//npm i uuid@8.3.2

//8) To update dependencies
//npm update

//8) To uninstall dependencies
//npm un
