// frontend js file
const socket = io();
let allMessages = [];

// attribute selectors from socketOneChat.handlebars
const input = document.getElementById("input");
const messages = document.getElementById("messages");
const messageForm = document.getElementById("messageForm");
const roomName = document.getElementById("rooms");
const userList = document.getElementById("users");

// find the username and room from the query string, might not need later
let pathname = location.pathname;
const username = pathname.split("/")[2];
const room = pathname.split("/")[4];

socket.emit("joinRoom", { username, room });

const handleSocket = () => {
  socket.on("roomUsers", ({ room, users }) => {
    outputRoomName(room);
    outputUsers(users);
  });

  socket.on("message", (message) => {
    outputMessage(message);
  });
};

const handleMessageEvent = (event) => {
  event.preventDefault();
  const message = document.querySelector("#messagesInput");

  if (!message) {
    return false;
  }

  socket.emit("chatMessage", message.value);

  message.value = "";
  message.focus();
};

function outputMessage(message) {
  const div = document.createElement("div");
  div.setAttribute("class", "message");
  div.setAttribute("style", "background-color: lightgreen;");

  const p = document.createElement("p");
  p.setAttribute("class", "messageInfo");

  p.innerText = message.username;
  p.innerHTML += `<span> ${message.time}</span>`;
  div.appendChild(p);

  const messagesListP = document.createElement("p");
  messagesListP.setAttribute("class", "messagesList");
  // perhaps add styling for the user's chat messages here

  messagesListP.innerText = message.text;
  div.appendChild(messagesListP);

  document.getElementById("messages").appendChild(div);
  div.scrollTop = messages.scrollHeight;
}

const outputRoomName = (room) => {
  // perhaps add styling here for displaying the room name

  roomName.innerText = room;
};

const outputUsers = (users) => {
  userList.innerHTML = "";
  users.forEach((user) => {
    const li = document.createElement("li");
    li.innerText = user.username;
    userList.appendChild(li);
  });
};

messageForm.addEventListener("submit", handleMessageEvent);
handleSocket();
