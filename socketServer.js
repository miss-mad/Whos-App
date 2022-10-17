// 3 basic socket events:
// user joins a room
// user sends a message
// user leaves a room

const formatMessage = require("./utils/socketHelpers");

const socketio = require("socket.io");
const io = socketio(server);

io.on("connection", (socket) => {
  socket.on("joinRoom", ({ username, room }) => {
    console.log("user is in a room: ", username, room, socket.id);

    const user = addUser(socket.id, username, room);

    socket.join(user.room);

    socket.emit("message", formatMessage("Good Bot ", "Who's App!"));

    socket.emit("onJoinRoom", "user has joined the room");

    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        formatMessage("Good Bot ", `${user.username} has joined the chat`)
      );

    io.to(user.room).emit("roomUsers", {
      room: user.room,
      users: getRoomUsers(user.room),
    });
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit(
        "message",
        formatMessage("Good Bot ", `${user.username} has left the chat`)
      );

      io.to(user.room).emit("roomUsers", {
        room: user.room,
        users: getRoomUsers(user.room),
      });
    }
  });
  
  socket.on("chatMessage", (msg) => {
    const user = getCurrentUser(socket.id);

    io.to(user.room).emit("message", formatMessage(user.username, msg));
  });
});

