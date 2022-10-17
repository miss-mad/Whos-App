const router = require("express").Router();
const contactRoutes = require("./contactRoutes");
const messageRoutes = require("./messageRoutes");
const userRoutes = require("./userRoutes");

// to create and delete Contacts
router.use("/contacts", contactRoutes);
// to create to delete Messages
router.use("/message", messageRoutes);
// to create and delete Users
router.use("/user", userRoutes);

module.exports = router;
