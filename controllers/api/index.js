const router = require("express").Router();
const chatsRoutes = require("./chatRoutes");
const loginRoutes = require("./loginRoutes");
const profileRoutes = require("./profileRoutes");
const contactRoutes = require("./contactRoutes");

// to a specfic person
router.use("/chat", chatsRoutes);
// to login to homepage
router.use("/login", loginRoutes);
// to view user profile
router.use("/profile", profileRoutes);
// to all contacts on homepage
router.use("/contact", contactRoutes);

module.exports = router;
