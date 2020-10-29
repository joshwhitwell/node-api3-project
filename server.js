//imports
const express = require('express');
const userRouter = require('./users/userRouter')

//server
const server = express();

const message = process.env.MESSAGE || 'Hello from server.js'

//custom middleware
function logger(req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`)
  next()
}

//use middleware
server.use(express.json())
server.use(logger)
server.use('/api/users', userRouter)

//routes
server.get('/', (req, res) => {
  res.send(`<h2>${message}</h2>`);
});

//exports
module.exports = server;
