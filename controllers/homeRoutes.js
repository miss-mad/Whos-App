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
  const userData = await User.findByPk(req.session.user_id, {
    attributes: { include: ["user_name"] },
  });

  let tempUserData = userData.get({ plain: true });

  res.render("dashboard", {
    logged_in: req.session.logged_in,
    username: tempUserData.user_name,
  });
});

// this route's contents are going to the ("/") above
// do we need login route? what does login.handlebars do
router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
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

    // render the main page (after login) for all contacts
    res.render("contacts", { contacts: contacts });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/user/:user_id/room/:room_id", async (req, res) => {
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
router.get("/allchats", withAuth, async (req, res) => {
  // finds user by its primary key and gets only the user's username data
  const userData = await User.findByPk(req.session.user_id, {
    attributes: { include: ["username"] },
  });

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

module.exports = router;
