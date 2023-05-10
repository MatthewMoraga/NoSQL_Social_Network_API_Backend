// creating an instance for router to import the controllers
const router = require("express").Router();

// importing routes
const userRoutes = require("./user_routes");
const thoughtRoutes = require("./thought_routes");

// setting up the end points for the user and thought routes
router.use("/user", userRoutes);
router.use("/thought", thoughtRoutes);

// exporting the routes
module.exports = router;