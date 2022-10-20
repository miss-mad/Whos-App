const router = require("express").Router();
const { Contact, User } = require("../models");
const withAuth = require("../utils/auth");

// ______________________ HOME ROUTES ______________________
// ask for login
// this should be the login route (in this case, homepage = login page = first page = /)
router.get("/", withAuth, (req, res) => {
  res.render("homepage", { logged_in: req.session.logged_in });
});

router.get("/dashboard", withAuth, async (req, res) => {
  console.log("Req Session in /dashboard: ", req.session);

  const userData = await User.findByPk(req.session.user_id, {
    attributes: { include: ["user_name"] },
  });

  console.log("\nuserData", userData);

  let tempUserData = userData.get({ plain: true });

  console.log(tempUserData);

  res.render("dashboard", {
    logged_in: req.session.logged_in,
    username: tempUserData.user_name,
  });
});

// this route's contents are going to the ("/") above
// do we need login route? what does login.handlebars do
router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  console.log("Session in /login: ", req.session);

  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }

  res.render("login");
});

// ______________________ PROFILE ROUTES ______________________
//contact
// the route for all contacts
router.get("/contacts", async (req, res) => {
  try {
    const contactData = await User.findAll();

    const contacts = contactData.map((user) => {
      return user.dataValues;
    });
    // console.log(contacts);

    // render the main page (after login) for all contacts
    res.render("contacts", { contacts: contacts });
  } catch (err) {
    res.status(500).json(err);
  }
});

// the route for particular contact
router.get("/user/:user_id/room/:room_id", async (req, res) => {
  //TODO(if we have time*) render the personal chat page
  res.status(200).render("socketOneChat");
});

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// ______________________ SOCKET HOME ROUTES ______________________

// all chats page - route must match name of the page on main.handlebars
// INSERT WITHAUTH later once we know this is working
router.get("/allchats", async (req, res) => {
  console.log("req.session", req.session);
  // finds user by its primary key and gets only the user's username data
  const userData = await User.findByPk(req.session.user_id, {
    attributes: { include: ["username"] },
  });

  console.log("\nuserData", userData);

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
