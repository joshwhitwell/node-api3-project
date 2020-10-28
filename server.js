//imports
const express = require('express');

//server
const server = express();

//middleware
function logger(req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`)
  next()
}

server.use(express.json())
server.use(logger)

//routes
server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//exports
module.exports = server;
