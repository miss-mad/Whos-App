const router = require("express").Router();
const faker = require("faker");

const { User } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const userName = faker.internet.userName();

  try {
    const newUser = await User.create({
      email,
      password,
      firstName,
      lastName,
      userName,
    });

    req.session.save(() => {
      req.session.user_id = newUser.dataValues.id;
      req.session.logged_in = true;
      res.json({ user: newUser.dataValues, message: "Look whoooooo's here!" });
    });

    // console.log("New User: ", newUser);
    // res.status(200).json(newUser);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const getUser = await User.findOne({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    res.status(200).json(getUser);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const userData = await User.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!userData) {
      res.status(404).json({ message: "No user found with this id!" });
      return;
    }

    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res.status(400).json({ message: "Whoooooo was that???" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: "Whoooooo was that???" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.json({ user: userData, message: "Look Whoooooo's here!" });
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    // .destroy is an express-session method that means the session will be destroyed when the response ends
    req.session.destroy(() => {
      // .end is an express method that ends the response process
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
