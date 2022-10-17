// all helper functions for socket.io
const moment = require('moment');

// for formatting the chat message to add the user's username and time stamp with MomentJS
function formatMessage(username, text) {
  return {
    username,
    text,
    time: moment().format('h:mm a')
  };
}

module.exports = formatMessage;