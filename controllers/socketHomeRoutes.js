// ______________________ SOCKET HOME ROUTES ______________________

const router = require("express").Router();

// all chats page - route must match name of the page on main.handlebars
router.get("/allchats", async (req, res) => {
    // name must match handlebars file
    res.render("socketAllChats");
  });
  
  // single chat page - route must match name of the page on socketAllChats.handlebars
  router.get("/user/:user_id/room/:room_id", async (req, res) => {
    // name must match handlebars file
    res.render("socketOneChat");
  });
  
  // room 2 not used yet, can add later
  // right now all users are in one room
  // single chat page - route must match name of the page on socketAllChats.handlebars
  router.get("/room2", async (req, res) => {
    // name must match handlebars file
    res.render("socketOneChat");
  });
  
  module.exports = router;
  