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

// the following functions are all for socketServer.js to help socket's events: user enters a room, user sends a message, and user leaves a room

let users = [];
// creates a users array that each new user gets added onto
const addUser = (id, username, room) => {
  const user = { id, username, room };

  users.push(user);

  return user;
};

//
const getRoomUsers = (room) => {
  return users.filter((user) => user.room === room);
};

// when a user leaves a room, find the user's id
const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  // if the index is not equal to -1, then return the users array without the user that just left with splice
  if (index !== -1) {
    // 0 index because we don't want to return the entire array, just the user
    return users.splice(index, 1)[0];
  }
};

// get the current user to determine who sent the chat message
const getCurrentUser = (id) => {
  return users.find((user) => user.id === id);
};

module.exports = {
  formatMessage,
  addUser,
  getRoomUsers,
  removeUser,
  getCurrentUser,
};
