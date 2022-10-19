const router = require("express").Router();
const { Contact, User } = require("../models");
const withAuth = require("../utils/auth");

// ask for login
// this should be the login route (in this case, homepage = login page = first page = /)
router.get("/", async (req, res) => {
  try {
    // force login
    res.redirect("/login");
  } catch (err) {
    res.status(500).json(err);
  }
});

// this route's contents are going to
router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }

  res.render("login");
});

// this is a duplicate so commenting it out
// router.get("/login", (req, res) => {
//   // If the user is already logged in, redirect the request to another route
//   if (req.session.logged_in) {
//     res.redirect("/profile");
//     return;
//   }

//   res.render("login");
// });

// PROFILE ROUTES

//contact
// the route for all contacts
router.get("/contacts", async (req, res) => {
  try {
    const contactData = await Contact.findAll({
      include: [{ all: true, nested: true }],
    });

    const contacts = contactData.get({ plain: true });
    console.log(contacts);

    // render the main page (after login) for all contacts
    res.status(200).render("socketAllChats", {
      ...contacts,
      // logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// the route for particular contact
router.get("/user/:user_id/room/:room_id", async (req, res) => {
  try {
    const contactData = await Contact.findByPk(req.params.id, {
      include: [
        {
          model: Contact,
          Message,
          attributes: ["firstName", "lastName", "email"],
          attributes: ["content"],
        },
      ],
    });

    const contacts = contactData.get({ plain: true });

    //TODO(if we have time*) render the personal chat page
    res.status(200).render("socketOneChat", {
      ...contacts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
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
