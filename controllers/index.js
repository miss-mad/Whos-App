const router = require("express").Router();
const homeRoutes = require("./homeRoutes");
const profileRoutes = require("./profileRoutes");
const apiRoutes = require("./api");

// home routes
router.use("/", homeRoutes);
// to api
router.use("/api", apiRoutes);
// to a user profile
router.use("/profile", profileRoutes);

module.exports = router;
