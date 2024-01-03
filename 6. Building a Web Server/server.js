const EventEmitter = require("events");
const http = require("http");
const fs = require("fs");
const path = require("path");
const fsPromises = require("fs").promises;
const logEvents = require("./logEvents.js");

class Emmitter extends EventEmitter {}

const myEmitter = new Emmitter();
myEmitter.on("log", (msg, fileName) => logEvents(msg, fileName));

const PORT = process.env.PORT || 3500;

const serveFile = async (filePath, contentType, response) => {
  try {
    const rawData = await fsPromises.readFile(
      filePath,
      !contentType.includes("image") ? "utf8" : ""
    );
    const data =
      contentType === "application/json" ? JSON.parse(rawData) : rawData;
    response.writeHead(filePath.includes("404.html") ? 404 : 200, {
      "Content-Type": contentType,
    });
    response.end(
      contentType === "application/json" ? JSON.stringify(data) : data
    );
  } catch (err) {
    console.log(err);
    myEmitter.emit("log", `${err.name}:${err.message}`, "errLog.txt");
    response.statusCode = 500;
    response.end();
  }
};
const server = http.createServer((req, res) => {
  console.log(req.url, req.method);
  myEmitter.emit("log", `${req.url}\t${req.method}`, "reqLog.txt");

  const extension = path.extname(req.url);

  let contentType;
  switch (extension) {
    case ".css":
      contentType = "text/css";
      break;
    case ".js":
      contentType = "text/javascript";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".jpg":
      contentType = "image/jpeg";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".txt":
      contentType = "text/plain";
      break;
    default:
      contentType = "text/html";
  }
  let filePath =
    contentType === "text/html" && req.url === "/"
      ? path.join(__dirname, "views", "index.html")
      : contentType === "text/html" && req.url.slice(-1) === "/"
      ? path.join(__dirname, "views", req.url, "index.html")
      : contentType === "text/html"
      ? path.join(__dirname, "views", req.url)
      : path.join(__dirname, req.url);

  if (!extension && req.url.slice(-1) !== "/") filePath += ".html";

  const fileExist = fs.existsSync(filePath);
  if (fileExist) {
    serveFile(filePath, contentType, res);
  } else {
    switch (path.parse(filePath).base) {
      case "old-page.html":
        res.writeHead(301, { Location: "/new-page.html" });
        res.end();
        break;

      case "www-page.html":
        /* used to send a response header to the request. It allows you
        to set the status code, headers, and other information that the
        client will receive as part of the HTTP response 
        The basic syntax for response.writeHead is as follows:
            response.writeHead(statusCode, [statusMessage], [headers]);
                - statusCode: The HTTP status code to be sent in the response. 
                            For example, 200 for OK, 404 for Not Found, etc
                - statusMessage (optional): A human-readable status message to 
                            be sent in the response. If omitted, a default message
                            corresponding to the statusCode is used.
                - headers (optional): An object containing additional response headers.
        */
        res.writeHead(301, "Received", { Location: "/" });
        /* This method signals to the server that all of the response
        headers and body have been sent; that server should consider this
         message complete. The method, response.end(), MUST be called on
        each response. */
        res.end();
        break;

      default:
        serveFile(path.join(__dirname, "views", "404.html"), "text/html", res);
    }
  }
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
