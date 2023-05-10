// importing files and packages
const { Thought, User, Reaction } = require("../models");
const {Types} = require("mongoose");

// the though control object will handle the various api requests related to the thoughts
// like the user control object
// here async functions are used as handlers for all of the API endpoints

const ThoughtControl = {
    async getAllThoughts(req, res) {
        try {
            const thoughts = await Thought.find({});
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // get thought by id handler
    async getThoughtsById (req, res) {
        try {
            const thought = await Thought.findOne({_id:req.params.thoughtId});
            if(!thought) {
                res.status(400).json({ message: "no thought found" });
            } else {
                res.json(thought);
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // create thought handler
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            res.status(201).json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // delete thought handler
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findByIdAndDelete({_id:req.params.thoughtID});
            res.status(200).json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // update thought by id handler
    async updateThoughtById(req, res) {
        try {
            const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, {
                new: true
            });
            if (!thought) {
                res.status(404).json({ message: "Thought not found" });
            } else {
                res.json(thought)
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // create reaction handler
    // a little different here since we are using $addToSet to add the value in the req.body
    // to the reactions array, but only if the value does not already exist in the array.
    // and a ternary operator is used to check to see if thought is a truthy value.
    async createReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                {_id:req.params.thoughtID},
                {$addToSet: {reactions: req.body}},
                {runValidators: true, new: true}
            );
            thought ? res.json(thought) : res.status(404)({message: "not found"})
        } catch (e) {
            res.status(500).json(e);
        }
    },
    // delete reaction handler
    // $pull removes any reactions with a reaction id that matches the req.params.reactionId
    // from the reactions array
    async deleteReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                {_id:req.params.thoughtID},
                {$pull: {reactions: {reactionId: req.params.reactionId}}},
                {runValidators: true, new: true}
            );
            thought ? res.json(thought) : res.status(404).json({message: "not found"});
        } catch (e) {
            res.status(500).json(e);
        }
    },

};

module.exports = ThoughtControl;