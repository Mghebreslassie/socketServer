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
app.get("/", (req, res) => {
  res.send("<h1>welcome sanity check</h1>");
});
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

server.listen(3001, () => {
  console.log("server is running");
});
