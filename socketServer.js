// 3 basic socket events:
    // user joins a room
    // user sends a message
    // user leaves a room

const formatMessage = require("./utils/socketHelpers")


module.exports = {
    run_socket: run_socket,
  };