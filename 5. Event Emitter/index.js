const logEvents = require("./logEvents");

const EventEmitter = require("events");

class MyEmmitter extends EventEmitter {}

//initialize object
const myEmitter = new MyEmmitter();

//add listener for the log event
myEmitter.on("log", (msg) => logEvents(msg));

/* setTimeout function  is used to schedule the execution of a function after a specific period of time. It is part of the timing functions provided by JavaScript.

The basic syntax of setTimeout is as follows: 
    setTimeout(callback, delay, arg1, arg2, ...);
        - callback: The function that will be executed after the specified time has elapsed.
        - delay: The time in milliseconds that must pass before the function is executed.
        - arg1, arg2, ...: Optional arguments that will be passed to the function when it is called.
 */
setTimeout(() => {
  myEmitter.emit("log", "Log event emitted!");
}, 2000);
