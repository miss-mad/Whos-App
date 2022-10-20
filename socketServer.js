// 3 basic socket events:
// user joins a room
// user sends a message
// user leaves a room

const {
  formatMessage,
  addUser,
  getRoomUsers,
  removeUser,
  getCurrentUser,
} = require("./utils/socketHelpers");

// this function handles the 3 main socket events
const run_socket = (server) => {
  const socketio = require("socket.io");
  const io = socketio(server);

  io.on("connection", (socket) => {
    join_room(io, socket);

    leave_room(io, socket);

    emit_message(io, socket);
  });
};

const join_room = (io, socket) => {
  socket.on("joinRoom", ({ username, room }) => {
    console.log("user is in a room: ", username, room, socket.id);

    const user = addUser(socket.id, username, room);

    socket.join(user.room);

    socket.emit("message", formatMessage("Hoo-dini Bot ", "Welcome to Who's App!"));

    socket.emit("onJoinRoom", "user has joined the room");

    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        formatMessage("Hoo-dini Bot ", `${user.username} has joined the chat`)
      );

    io.to(user.room).emit("roomUsers", {
      room: user.room,
      users: getRoomUsers(user.room),
    });
  });
};

const leave_room = (io, socket) => {
  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit(
        "message",
        formatMessage("Hoo-dini Bot ", `${user.username} has left the chat`)
      );

      io.to(user.room).emit("roomUsers", {
        room: user.room,
        users: getRoomUsers(user.room),
      });
    }
  });
};

const emit_message = (io, socket) => {
  socket.on("chatMessage", (msg) => {
    const user = getCurrentUser(socket.id);

    io.to(user.room).emit("message", formatMessage(user.username, msg));
  });
};

// exports this to the server.js (lines 20-21)
module.exports = {
  run_socket: run_socket,
};
