// importing packages and files
const router = require("express").Router();
const apiRoutes = require("./api_routes");

// sets the all of the endpoints to start the route at "/api"
router.use("/api", apiRoutes);
router.use((req, res) => {
    return res.sendStatus(404).send("no route found")
});

module.exports = router;