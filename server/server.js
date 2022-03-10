const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const process = require("process");

// Initialize express app
const app = express();

// Use the client static page for express app
app.use(express.static(`${__dirname}/../client`));

// Create server using express and socketio
const server = http.createServer(app);
const io = socketio(server);

// Handling socket connection
io.on("connection", (sock) => {
  sock.on("updateUsername", (username) => {
    sock.username = username;
    sock.emit("message", " has connected", sock.username);
  });
  
  // message
  sock.on("message", (content) => io.emit("message", content, sock.username));
});

// Server error handling
server.on("error", (err) => {
  console.error(err);
});

// Start server on port 8080
server.listen(8080 || 5000, process.env.IP, () => {
  console.log("server is running...");
});
