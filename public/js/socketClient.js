// frontend js file
const socket = io();
let allMessages = [];

// attribute selectors from socketOneChat.handlebars
const input = document.getElementById("input");
const messages = document.getElementById("messages");
const messageForm = document.getElementById("messageForm");
const roomName = document.getElementById("rooms");
const userList = document.getElementById("users");

// find the user id and room id from the query string, might not need later
let pathname = location.pathname;
const username = pathname.split("/")[2];
const room = pathname.split("/")[4];

socket.emit("joinRoom", { username, room });

const handleSocket = () => {
  socket.on("roomUsers", (event) => {
    const listItem = document.createElement("li");
    const message = event.target.elements.input.value.trim();

    listItem.setAttribute("class", "chat");
    listItem.textContent = "user: " + message;
    messages.appendChild(listItem);

    allMessages.push(message);
    console.log(allMessages);

    input.value = "";
    input.focus();

    userList.innerHTML = "";
    users.forEach((user) => {
      const li = document.createElement("li");
      li.innerText = user.username;
      userList.appendChild(li);
    });
  });

  socket.on("message", (message) => {
    console.log(message);
  });
};

const handleMessageEvent = (event) => {
  event.preventDefault();
  const message = event.target.elements.input.value.trim();

  if (!message) {
    return false;
  }

  socket.emit("chatMessage", message);

  event.target.elements.input.value = "";
  event.target.elements.input.focus();
};

messageForm.addEventListener("submit", handleMessageEvent);

handleSocket();
