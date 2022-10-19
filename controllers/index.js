const router = require("express").Router();
const homeRoutes = require("./homeRoutes");
// const profileRoutes = require("./profileRoutes");
const apiRoutes = require("./api");
// const socketHomeRoutes = require("./socketHomeRoutes")

// home routes (blended home routes, profile routes and socket home routes)
router.use("/", homeRoutes);

// to api
router.use("/api", apiRoutes);
// // to a user profile
// router.use("/profile", profileRoutes);
// include path to socket home routes?

module.exports = router;
