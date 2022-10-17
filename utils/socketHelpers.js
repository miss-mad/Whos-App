// all helper functions for socket.io
const moment = require("moment");

// for formatting the chat message to add the user's username and time stamp with MomentJS
const formatMessage = (username, text) => {
  return {
    username,
    text,
    time: moment().format("h:mm a"),
  };
};

// generating a random user id for every single person who joins the server - this is to test socket, will replace with user's username
const generate_random_user_id = () => {
  return Math.floor(Math.random() * 100);
};

// the following functions are all for socketServer.js to help socket's events: user enters a room, user sends a message, and user leaves a room
const addUser = (id, username, room) => {
  const user = { id, username, room };

  users.push(user);

  return user;
};

const getRoomUsers = (room) => {
  return users.filter((user) => user.room === room);
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  // if the index is not equal to -1, then return the users array without the user that just left with splice
  if (index !== -1) {
    // 0 index because we don't want to return the entire array, just the user
    return users.splice(index, 1)[0];
  }
};

module.exports = {
  formatMessage,
  generate_random_user_id,
  addUser,
  getRoomUsers,
  removeUser,
};
