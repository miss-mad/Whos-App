const router = require("express").Router();
const { User, Contact, Message } = require("../models");

//contact
// the route for all contacts
router.get("/contacts", async (req, res) => {
  try {
    const contactData = await Contact.findAll({
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

module.exports = router;
