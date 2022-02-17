const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const PORT = process.env.PORT || 5000;
const message = [];
io.on("connection", (socket) => {
  console.log(socket.id);

  //join a room
  socket.on("join_room", (data) => {
    socket.join(data.roomID);
    console.log(
      `user with name ${data.username} and id ${socket.id} joined room ${data.roomID}`
    );
  });
  socket.on("send_message", (data) => {
    message.push(data);
    socket.to(data.roomID).emit("recieve_message", message);
  });
  socket.on("disconnect", () => {
    console.log("user has disconnected " + socket.id);
  });
});

server.listen(PORT, () => {
  console.log("server is running" + PORT);
});
