const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
app.use(cors());

io.on("connection", (socket) => {
  console.log(socket.id);

  //join a room
  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`user with id ${socket.id} joined room ${data}`);
  });
  socket.on("disconnect", () => {
    console.log("user has disconnected " + socket.id);
  });
});

server.listen(3001, () => {
  console.log("server is running");
});
