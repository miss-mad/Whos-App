const router = require("express").Router();
const { Contact } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/:id", async (req, res) => {
  try {
    const newContact = await Contact.findOne({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    res.status(200).json(newContact);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const newContact = await Contact.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newContact);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const contactData = await Contact.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!contactData) {
      res.status(404).json({ message: "No contact found with this id!" });
      return;
    }

    res.status(200).json(contactData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
