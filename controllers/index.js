const router = require("express").Router();
const homeRoutes = require("./homeRoutes");
const apiRoutes = require("./api");

// home routes (blended home routes, profile routes and socket home routes)
router.use("/", homeRoutes);

// to api
router.use("/api", apiRoutes);

module.exports = router;
