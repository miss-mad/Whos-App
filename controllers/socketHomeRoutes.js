// ______________________ SOCKET HOME ROUTES ______________________

const router = require("express").Router();

// all chats page - route must match name of the page on main.handlebars
// INSERT WITHAUTH later once we know this is working
router.get("/allchats", async (req, res) => {
  console.log("req.session", req.session)
  // finds user by its primary key and gets only the user's username data
  const userData = await User.findByPk(req.session.user_id, {
    attributes: { include: ["username"] },
  });

  console.log("\nuserData", userData)

  let tempUserData = userData.get({ plain: true });

  // render name must match handlebars file
  // then renders username data with the socketAllChats handlebars page
  res.render("socketAllChats", {
    ...tempUserData,
    // comment this back in once logged in feature is working
    // logged_in: req.session.logged_in,
  });
  // now the username is included in the URL when the user clicks a room to join
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
  
