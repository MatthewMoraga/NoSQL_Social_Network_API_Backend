// importing packages and files
const router = require("express").Router();
const {
    getAllThoughts,
    getThoughtsById,
    createThought,
    deleteThought,
    updateThoughtById,
    createReaction,
    deleteReaction,
} = require("../../controllers/thought-control");

// importing an object controller allows you to easily access the methods
// which you can pass in to your routes to make nifty mongo one liner routes
// instead of having to do all of that the sql way

// get and post routes for all thoughts the mongo way
router.route("/").get(getAllThoughts).post(createThought);

// get, put, post and delete thoughts
router.route("/:thoughtId").get(getThoughtsById).put(updateThoughtById).delete(deleteThought);

// post reaction to thought route
router.route("/:thoughtId/reactions").post(createReaction);

// delete reaction to thought route
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

