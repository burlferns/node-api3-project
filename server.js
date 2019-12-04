// Import Express and external middleware
const express = require('express');
const helmet = require("helmet");

// Import specific Routers
const userRouter = require("./users/userRouter"); 
const postRouter = require("./posts/postRouter"); 

// Create server
const server = express();

// Use global middleware 
server.use(helmet());
server.use(express.json());
server.use(logger);

// Specify general endpoints
server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

// Use specific Routers
server.use("/users", userRouter); 
server.use("/posts", postRouter); 

server.use(defaultResponse);

//custom middleware
function logger(req, res, next) {
  console.log(`[${new Date().toString()}] ${req.method} ${req.originalUrl}`);
  next();
}

function defaultResponse(req,res) {
  res.status(404).json("You have used an unsupported url")
}

module.exports = server;
