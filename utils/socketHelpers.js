// all helper functions for socket.io
const moment = require('moment');

// for formatting the chat message to add the user's username and time stamp with MomentJS
const formatMessage = (username, text) => {
  return {
    username,
    text,
    time: moment().format('h:mm a')
  };
}

const generate_random_user_id = () => {
  return Math.floor(Math.random() * 100)
}

module.exports = formatMessage, generate_random_user_id;