// frontend js file
const socket = io();
let allMessages = [];

// attribute selectors from socketOneChat.handlebars
const input = document.getElementById("input");
const messages = document.getElementById("messages");
const messageForm = document.getElementById("messageForm");
const roomName = document.getElementById("rooms");
const userList = document.getElementById("users");

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

handleSocket();
